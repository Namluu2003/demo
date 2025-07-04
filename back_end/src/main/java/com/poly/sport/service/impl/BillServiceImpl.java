package com.poly.sport.service.impl;

import com.poly.sport.entity.*;
import com.poly.sport.infrastructure.common.PhanTrang;
import com.poly.sport.infrastructure.common.ResponseObject;
import com.poly.sport.infrastructure.constant.*;
import com.poly.sport.infrastructure.converter.BillConvert;
import com.poly.sport.infrastructure.exception.NgoaiLe;

import com.poly.sport.infrastructure.request.bill.BillRequest;
import com.poly.sport.infrastructure.request.bill.BillSearchRequest;
import com.poly.sport.infrastructure.response.BillResponse;

import com.poly.sport.infrastructure.response.StatisticBillStatus;
import com.poly.sport.repository.*;
import com.poly.sport.service.BillService;
import com.poly.sport.util.GHNService;
import com.poly.sport.util.MailUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@Service
public class BillServiceImpl implements BillService {
    @Autowired
    private IBillRepository billRepository;
    @Autowired
    private IBillDetailRepository billDetailRepository;
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private IBillHistoryRepository billHistoryRepository;
    @Autowired
    private BillConvert billConvert;
    @Autowired
    private IPaymentMethodRepository paymentMethodRepository;
    @Autowired
    private VoucherRepository voucherRepository;
    @Autowired
    private SanPhamChiTietRepository sanPhamChiTietRepository;
    @Autowired
    private MailUtils mailUtils;
    @Autowired
    private GHNService ghnService;
    @Autowired
    private KhuyenMaiChiTietRepository khuyenMaiChiTietRepository;

    public PhanTrang<BillResponse> getAll(BillSearchRequest request) {
        Pageable pageable = PageRequest.of(request.getPage() - 1, request.getSizePage());
        return new PhanTrang<>(billRepository.getAll(request, pageable));
    }

    public List<BillHistory> getBillHistory(Long billId) {
        return billHistoryRepository.findByBillId(billId);
    }

    public Bill getOne(Long id) {
        return billRepository.findById(id).orElse(null);
    }

    private String genBillCode() {
        String prefix = "Hoá đơn ";
        int x = 1;
        String code = prefix + x;
        while (billRepository.existsByCode(code)) {
            x++;
            code = prefix + x;
        }
        return code;
    }

    public Bill findByCode(String code) {
        return billRepository.findByCode(code);
    }

    public List<Bill> getNewBill(BillSearchRequest request) {
        return billRepository.getNewBill(request);
    }

    @Override
    public Bill create() {
        if (billRepository.findByAccountIdAndStatusAndDeletedFalse(1L, BillStatusConstant.TAO_DON_HANG, PageRequest.of(0, 10)).getContent().size() >= 5) {
            throw new NgoaiLe("Chỉ được tạo tối đa 5 đơn hàng!");
        }
        Bill bill = new Bill();
        BillHistory billHistory = new BillHistory();
        bill.setAccount(accountRepository.findById(1L).get());
        bill.setStatus(BillStatusConstant.TAO_DON_HANG);
        bill.setCode(this.genBillCode());
        Bill billSave = billRepository.save(bill);
        billHistory.setBill(billSave);
        billHistory.setStatus(billSave.getStatus());
        billHistory.setNote("Tạo đơn hàng");
        billHistoryRepository.save(billHistory);
        return billSave;
    }

//    @Override
//    @Transactional(rollbackFor = Exception.class)
//    public Bill orderBill(Long id, BillRequest request) {
//        // Tìm hóa đơn theo ID, nếu không tồn tại thì ném ngoại lệ
//        Bill bill = billRepository.findById(id)
//                .orElseThrow(() -> new NgoaiLe("Hóa đơn không tồn tại"));
//
//        // Xử lý voucher nếu có
//        if (request.getVoucher() != null) {
//            // Kiểm tra và giảm số lượng voucher một cách nguyên tử
//            int updatedRows = voucherRepository.decreaseQuantityIfAvailable(request.getVoucher());
//            if (updatedRows == 0) {
//                throw new NgoaiLe("Voucher đã hết số lượng hoặc không tồn tại!");
//            }
//        }
//
//        // Chuyển đổi request thành entity
//        bill = billConvert.convertRequestToEntity(bill, request);
//
//        // Khởi tạo lịch sử hóa đơn và phương thức thanh toán
//        BillHistory history = new BillHistory();
//        history.setBill(bill);
//
//        PaymentMethod paymentMethod = new PaymentMethod();
//        paymentMethod.setBill(bill);
//        paymentMethod.setType(PaymentMethodConstant.TIEN_KHACH_DUA);
//
//        // Xử lý logic theo loại đơn hàng (Tại quầy hoặc Giao hàng)
//        if (request.getType() == TyperOrderConstant.TAI_QUAY) {
//            bill.setStatus(BillStatusConstant.HOAN_THANH);
//            bill.setReceiveDate(System.currentTimeMillis());
//
//            // Xử lý phương thức thanh toán
//            if (request.getPaymentMethod() == PaymentMethodConstant.TIEN_MAT) {
//                paymentMethod.setTotalMoney(bill.getTotalMoney() != null ? bill.getTotalMoney() : BigDecimal.ZERO);
//                paymentMethod.setNote("Đã thanh toán tiền mặt!");
//                paymentMethod.setMethod(PaymentMethodConstant.TIEN_MAT);
//                paymentMethodRepository.save(paymentMethod);
//            } else if (request.getPaymentMethod() == PaymentMethodConstant.CHUYEN_KHOAN) {
//                paymentMethod.setTotalMoney(bill.getTotalMoney() != null ? bill.getTotalMoney() : BigDecimal.ZERO);
//                paymentMethod.setNote("Đã chuyển khoản!");
//                paymentMethod.setTradingCode(request.getTradingCode());
//                paymentMethod.setMethod(PaymentMethodConstant.CHUYEN_KHOAN);
//                paymentMethodRepository.save(paymentMethod);
//            } else if (request.getPaymentMethod() == PaymentMethodConstant.TIEN_MAT_VA_CHUYEN_KHOAN) {
//                PaymentMethod paymentMethod1 = new PaymentMethod();
//                paymentMethod1.setBill(bill);
//                paymentMethod1.setTotalMoney(request.getTienMat() != null ? request.getTienMat() : BigDecimal.ZERO);
//                paymentMethod1.setNote("Đã thanh toán tiền mặt!");
//                paymentMethod1.setMethod(PaymentMethodConstant.TIEN_MAT);
//                paymentMethod1.setType(PaymentMethodConstant.TIEN_KHACH_DUA);
//                paymentMethodRepository.save(paymentMethod1);
//
//                paymentMethod.setTotalMoney(request.getTienChuyenKhoan() != null ? request.getTienChuyenKhoan() : BigDecimal.ZERO);
//                paymentMethod.setTradingCode(request.getTradingCode());
//                paymentMethod.setNote("Đã chuyển khoản!");
//                paymentMethod.setMethod(PaymentMethodConstant.CHUYEN_KHOAN);
//                paymentMethodRepository.save(paymentMethod);
//            }
//
//            history.setNote("Mua hàng thành công!");
//            history.setStatus(BillStatusConstant.HOAN_THANH);
//        } else if (request.getType() == TyperOrderConstant.GIAO_HANG) {
//            bill.setStatus(BillStatusConstant.CHO_GIAO);
//            history.setStatus(BillStatusConstant.CHO_GIAO);
//            history.setNote("Chờ giao");
//
//            // Xử lý thanh toán cho đơn giao hàng
//            if (request.getPaymentMethod() == PaymentMethodConstant.CHUYEN_KHOAN) {
//                BillHistory history1 = new BillHistory();
//                history1.setBill(bill);
//                history1.setNote("Đã xác nhận thông tin thanh toán!");
//                history1.setStatus(BillStatusConstant.XAC_NHAN_THONG_TIN_THANH_TOAN);
//                billHistoryRepository.save(history1);
//
//                BigDecimal totalMoney = bill.getTotalMoney() != null ? bill.getTotalMoney() : BigDecimal.ZERO;
//                BigDecimal moneyShip = bill.getMoneyShip() != null ? bill.getMoneyShip() : BigDecimal.ZERO;
//                paymentMethod.setTotalMoney(totalMoney.add(moneyShip));
//                paymentMethod.setNote("Đã chuyển khoản!");
//                paymentMethod.setTradingCode(request.getTradingCode());
//                paymentMethod.setMethod(PaymentMethodConstant.CHUYEN_KHOAN);
//                paymentMethodRepository.save(paymentMethod);
//            } else if (request.getPaymentMethod() == PaymentMethodConstant.TIEN_MAT_VA_CHUYEN_KHOAN) {
//                paymentMethod.setTotalMoney(request.getTienChuyenKhoan() != null ? request.getTienChuyenKhoan() : BigDecimal.ZERO);
//                paymentMethod.setNote("Đã chuyển khoản!");
//                paymentMethod.setTradingCode(request.getTradingCode());
//                paymentMethod.setMethod(PaymentMethodConstant.CHUYEN_KHOAN);
//                paymentMethodRepository.save(paymentMethod);
//            }
//        }
//
//        // Lưu lịch sử và hóa đơn
//        billHistoryRepository.save(history);
//        return billRepository.save(bill);
//    }


//    @Override
//    @Transactional(rollbackFor = Exception.class)
//    public Bill orderBill(Long id, BillRequest request) {
//        // Tìm hóa đơn theo ID, nếu không tồn tại thì ném ngoại lệ
//        Bill bill = billRepository.findById(id)
//                .orElseThrow(() -> new NgoaiLe("Hóa đơn không tồn tại"));
//
//        // Xử lý voucher nếu có
//        if (request.getVoucher() != null) {
//            int updatedRows = voucherRepository.decreaseQuantityIfAvailable(request.getVoucher());
//            if (updatedRows == 0) {
//                throw new NgoaiLe("Voucher đã hết số lượng hoặc không tồn tại!");
//            }
//        }
//
//        // Chuyển đổi request thành entity
//        bill = billConvert.convertRequestToEntity(bill, request);
//
//        // Khởi tạo lịch sử hóa đơn và phương thức thanh toán
//        BillHistory history = new BillHistory();
//        history.setBill(bill);
//
//        PaymentMethod paymentMethod = new PaymentMethod();
//        paymentMethod.setBill(bill);
//        paymentMethod.setType(PaymentMethodConstant.TIEN_KHACH_DUA);
//
//        // Xử lý logic theo loại đơn hàng (Tại quầy hoặc Giao hàng)
//        if (request.getType() == TyperOrderConstant.TAI_QUAY) {
//            bill.setStatus(BillStatusConstant.HOAN_THANH);
//            bill.setReceiveDate(System.currentTimeMillis());
//
//            // Xử lý phương thức thanh toán
//            if (request.getPaymentMethod() == PaymentMethodConstant.TIEN_MAT) {
//                paymentMethod.setTotalMoney(bill.getTotalMoney() != null ? bill.getTotalMoney() : BigDecimal.ZERO);
//                paymentMethod.setNote("Đã thanh toán tiền mặt!");
//                paymentMethod.setMethod(PaymentMethodConstant.TIEN_MAT);
//                paymentMethodRepository.save(paymentMethod);
//            } else if (request.getPaymentMethod() == PaymentMethodConstant.CHUYEN_KHOAN) {
//                paymentMethod.setTotalMoney(bill.getTotalMoney() != null ? bill.getTotalMoney() : BigDecimal.ZERO);
//                paymentMethod.setNote("Đã chuyển khoản!");
//                paymentMethod.setTradingCode(request.getTradingCode());
//                paymentMethod.setMethod(PaymentMethodConstant.CHUYEN_KHOAN);
//                paymentMethodRepository.save(paymentMethod);
//            } else if (request.getPaymentMethod() == PaymentMethodConstant.TIEN_MAT_VA_CHUYEN_KHOAN) {
//                PaymentMethod paymentMethod1 = new PaymentMethod();
//                paymentMethod1.setBill(bill);
//                paymentMethod1.setTotalMoney(request.getTienMat() != null ? request.getTienMat() : BigDecimal.ZERO);
//                paymentMethod1.setNote("Đã thanh toán tiền mặt!");
//                paymentMethod1.setMethod(PaymentMethodConstant.TIEN_MAT);
//                paymentMethod1.setType(PaymentMethodConstant.TIEN_KHACH_DUA);
//                paymentMethodRepository.save(paymentMethod1);
//
//                paymentMethod.setTotalMoney(request.getTienChuyenKhoan() != null ? request.getTienChuyenKhoan() : BigDecimal.ZERO);
//                paymentMethod.setTradingCode(request.getTradingCode());
//                paymentMethod.setNote("Đã chuyển khoản!");
//                paymentMethod.setMethod(PaymentMethodConstant.CHUYEN_KHOAN);
//                paymentMethodRepository.save(paymentMethod);
//            }
//
//            history.setNote("Mua hàng thành công!");
//            history.setStatus(BillStatusConstant.HOAN_THANH);
//        } else if (request.getType() == TyperOrderConstant.GIAO_HANG) {
//            bill.setStatus(BillStatusConstant.CHO_GIAO_HANG);
//            history.setStatus(BillStatusConstant.CHO_GIAO_HANG);
//            history.setNote("Chờ giao");
//
//            // Xử lý thanh toán cho đơn giao hàng
//            if (request.getPaymentMethod() == PaymentMethodConstant.TIEN_MAT) {
//                if (request.getTienMat() != null && request.getTienMat().compareTo(BigDecimal.ZERO) > 0) {
//                    // Thanh toán tiền mặt tại quầy
//                    BigDecimal totalMoney = bill.getTotalMoney() != null ? bill.getTotalMoney() : BigDecimal.ZERO;
//                    BigDecimal moneyShip = bill.getMoneyShip() != null ? bill.getMoneyShip() : BigDecimal.ZERO;
//                    paymentMethod.setTotalMoney(totalMoney.add(moneyShip));
//                    paymentMethod.setNote("Đã thanh toán tiền mặt tại quầy!");
//                    paymentMethod.setMethod(PaymentMethodConstant.TIEN_MAT);
//                    paymentMethodRepository.save(paymentMethod);
//
//                    BillHistory historyPaid = new BillHistory();
//                    historyPaid.setBill(bill);
//                    historyPaid.setNote("Đã thanh toán tại quầy!");
//                    historyPaid.setStatus(BillStatusConstant.XAC_NHAN_THONG_TIN_THANH_TOAN);
//                    billHistoryRepository.save(historyPaid);
//                }
//            }
//
//
//
////            if (request.getTienMat() != null && request.getTienMat().compareTo(BigDecimal.ZERO) > 0) {
////                BigDecimal totalMoney = bill.getTotalMoney() != null ? bill.getTotalMoney() : BigDecimal.ZERO;
////                BigDecimal moneyShip = bill.getMoneyShip() != null ? bill.getMoneyShip() : BigDecimal.ZERO;
////                paymentMethod.setTotalMoney(totalMoney.add(moneyShip));
////                paymentMethod.setNote("Đã thanh toán tiền mặt tại quầy!");
////                paymentMethod.setMethod(PaymentMethodConstant.TIEN_MAT);
////                paymentMethodRepository.save(paymentMethod);
////
////                BillHistory historyPaid = new BillHistory();
////                historyPaid.setBill(bill);
////                historyPaid.setNote("Đã thanh toán tại quầy!");
////                historyPaid.setStatus(BillStatusConstant.XAC_NHAN_THONG_TIN_THANH_TOAN);
////                billHistoryRepository.save(historyPaid);
////            }
//
//            else if (request.getPaymentMethod() == PaymentMethodConstant.CHUYEN_KHOAN) {
//                // Thanh toán chuyển khoản tại quầy
//                BigDecimal totalMoney = bill.getTotalMoney() != null ? bill.getTotalMoney() : BigDecimal.ZERO;
//                BigDecimal moneyShip = bill.getMoneyShip() != null ? bill.getMoneyShip() : BigDecimal.ZERO;
//                paymentMethod.setTotalMoney(totalMoney.add(moneyShip));
//                paymentMethod.setNote("Đã chuyển khoản!");
//                paymentMethod.setTradingCode(request.getTradingCode());
//                paymentMethod.setMethod(PaymentMethodConstant.CHUYEN_KHOAN);
//                paymentMethodRepository.save(paymentMethod);
//
//                BillHistory historyPaid = new BillHistory();
//                historyPaid.setBill(bill);
//                historyPaid.setNote("Đã xác nhận thông tin thanh toán!");
//                historyPaid.setStatus(BillStatusConstant.XAC_NHAN_THONG_TIN_THANH_TOAN);
//                billHistoryRepository.save(historyPaid);
//            } else if (request.getPaymentMethod() == PaymentMethodConstant.TIEN_MAT_VA_CHUYEN_KHOAN) {
//                // Thanh toán kết hợp tại quầy
//                PaymentMethod paymentMethod1 = new PaymentMethod();
//                paymentMethod1.setBill(bill);
//                paymentMethod1.setTotalMoney(request.getTienMat() != null ? request.getTienMat() : BigDecimal.ZERO);
//                paymentMethod1.setNote("Đã thanh toán tiền mặt!!");
//                paymentMethod1.setMethod(PaymentMethodConstant.TIEN_MAT);
//                paymentMethod1.setType(PaymentMethodConstant.TIEN_KHACH_DUA);
//                paymentMethodRepository.save(paymentMethod1);
//
//                paymentMethod.setTotalMoney(request.getTienChuyenKhoan() != null ? request.getTienChuyenKhoan() : BigDecimal.ZERO);
//                paymentMethod.setTradingCode(request.getTradingCode());
//                paymentMethod.setNote("Đã chuyển khoản!");
//                paymentMethod.setMethod(PaymentMethodConstant.CHUYEN_KHOAN);
//                paymentMethodRepository.save(paymentMethod);
//
//                BillHistory historyPaid = new BillHistory();
//                historyPaid.setBill(bill);
//                historyPaid.setNote("Đã xác nhận thông tin thanh toán!");
//                historyPaid.setStatus(BillStatusConstant.XAC_NHAN_THONG_TIN_THANH_TOAN);
//                billHistoryRepository.save(historyPaid);
//            }
//        }
//
//        // Lưu lịch sử và hóa đơn
//        billHistoryRepository.save(history);
//        return billRepository.save(bill);
//    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Bill orderBill(Long id, BillRequest request) {
        Bill bill = billRepository.findById(id)
                .orElseThrow(() -> new NgoaiLe("Hóa đơn không tồn tại"));

        if (request.getVoucher() != null) {
            Voucher voucher = voucherRepository.findById(request.getVoucher())
                    .orElseThrow(() -> new NgoaiLe("Voucher không tồn tại!"));

            // Update voucher status


            // Check voucher status
            if (voucher.getStatus() == 0) {
                throw new NgoaiLe("Voucher " + voucher.getCode() + " chưa bắt đầu! Hiệu lực từ: " + voucher.getStartDate());
            }
            if (voucher.getStatus() == 2) {
                throw new NgoaiLe("Voucher " + voucher.getCode() + " đã kết thúc! Hết hạn vào: " + voucher.getEndDate());
            }

            // Check and decrease quantity
            int updatedRows = voucherRepository.decreaseQuantityIfAvailable(request.getVoucher());
            if (updatedRows == 0) {
                throw new NgoaiLe("Voucher " + voucher.getCode() + " đã hết số lượng!");
            }

            bill.setVoucher(voucher); // Assuming billConvert.convertRequestToEntity doesn't override this
        }

        bill = billConvert.convertRequestToEntity(bill, request);

        BillHistory history = new BillHistory();
        history.setBill(bill);

        PaymentMethod paymentMethod = new PaymentMethod();
        paymentMethod.setBill(bill);
        paymentMethod.setType(PaymentMethodConstant.TIEN_KHACH_DUA);

        if (request.getType() == TyperOrderConstant.TAI_QUAY) {
            bill.setStatus(BillStatusConstant.HOAN_THANH);
            bill.setReceiveDate(System.currentTimeMillis());

            if (request.getPaymentMethod() == PaymentMethodConstant.TIEN_MAT) {
                paymentMethod.setTotalMoney(bill.getTotalMoney() != null ? bill.getTotalMoney() : BigDecimal.ZERO);
                paymentMethod.setNote("Đã thanh toán tiền mặt!");
                paymentMethod.setMethod(PaymentMethodConstant.TIEN_MAT);
                paymentMethodRepository.save(paymentMethod);
            } else if (request.getPaymentMethod() == PaymentMethodConstant.CHUYEN_KHOAN) {
                paymentMethod.setTotalMoney(bill.getTotalMoney() != null ? bill.getTotalMoney() : BigDecimal.ZERO);
                paymentMethod.setNote("Đã chuyển khoản!");
                paymentMethod.setTradingCode(request.getTradingCode());
                paymentMethod.setMethod(PaymentMethodConstant.CHUYEN_KHOAN);
                paymentMethodRepository.save(paymentMethod);
            } else if (request.getPaymentMethod() == PaymentMethodConstant.TIEN_MAT_VA_CHUYEN_KHOAN) {
                PaymentMethod paymentMethod1 = new PaymentMethod();
                paymentMethod1.setBill(bill);
                paymentMethod1.setTotalMoney(request.getTienMat() != null ? request.getTienMat() : BigDecimal.ZERO);
                paymentMethod1.setNote("Đã thanh toán tiền mặt!");
                paymentMethod1.setMethod(PaymentMethodConstant.TIEN_MAT);
                paymentMethod1.setType(PaymentMethodConstant.TIEN_KHACH_DUA);
                paymentMethodRepository.save(paymentMethod1);

                paymentMethod.setTotalMoney(request.getTienChuyenKhoan() != null ? request.getTienChuyenKhoan() : BigDecimal.ZERO);
                paymentMethod.setTradingCode(request.getTradingCode());
                paymentMethod.setNote("Đã chuyển khoản!");
                paymentMethod.setMethod(PaymentMethodConstant.CHUYEN_KHOAN);
                paymentMethodRepository.save(paymentMethod);
            }

            history.setNote("Mua hàng thành công!");
            history.setStatus(BillStatusConstant.HOAN_THANH);
        } else if (request.getType() == TyperOrderConstant.GIAO_HANG) {
            bill.setStatus(BillStatusConstant.CHO_GIAO_HANG);
            history.setStatus(BillStatusConstant.CHO_GIAO_HANG);
            history.setNote("Chờ giao hàng");

            // Deduct inventory when moving to DA_XAC_NHAN
            for (BillDetail x : billDetailRepository.findByBillId(bill.getId())) {
                SanPhamChiTiet shoeDetail = x.getShoeDetail();
                if (shoeDetail.getQuantity() < x.getQuantity()) {
                    throw new NgoaiLe("Sản phẩm " + shoeDetail.getShoe().getName() + " [" +
                            shoeDetail.getColor().getName() + "-" + shoeDetail.getSize().getName() +
                            "] không đủ số lượng để giao!");
                }
                shoeDetail.setQuantity(shoeDetail.getQuantity() - x.getQuantity());
                sanPhamChiTietRepository.save(shoeDetail);
            }

            if (request.getPaymentMethod() == PaymentMethodConstant.TIEN_MAT) {
                if (request.getTienMat() != null && request.getTienMat().compareTo(BigDecimal.ZERO) > 0) {
                    BigDecimal totalMoney = bill.getTotalMoney() != null ? bill.getTotalMoney() : BigDecimal.ZERO;
                    BigDecimal moneyShip = bill.getMoneyShip() != null ? bill.getMoneyShip() : BigDecimal.ZERO;
                    paymentMethod.setTotalMoney(totalMoney.add(moneyShip));
                    paymentMethod.setNote("Đã thanh toán tiền mặt tại quầy!");
                    paymentMethod.setMethod(PaymentMethodConstant.TIEN_MAT);
                    paymentMethodRepository.save(paymentMethod);

//                    BillHistory historyPaid = new BillHistory();
//                    historyPaid.setBill(bill);
//                    historyPaid.setNote("Đã thanh toán tại quầy!");
//                    historyPaid.setStatus(BillStatusConstant.XAC_NHAN_THONG_TIN_THANH_TOAN);
//                    billHistoryRepository.save(historyPaid);
                }
            } else if (request.getPaymentMethod() == PaymentMethodConstant.CHUYEN_KHOAN) {
                BigDecimal totalMoney = bill.getTotalMoney() != null ? bill.getTotalMoney() : BigDecimal.ZERO;
                BigDecimal moneyShip = bill.getMoneyShip() != null ? bill.getMoneyShip() : BigDecimal.ZERO;
                paymentMethod.setTotalMoney(totalMoney.add(moneyShip));
                paymentMethod.setNote("Đã chuyển khoản!");
                paymentMethod.setTradingCode(request.getTradingCode());
                paymentMethod.setMethod(PaymentMethodConstant.CHUYEN_KHOAN);
                paymentMethodRepository.save(paymentMethod);

                BillHistory historyPaid = new BillHistory();
                historyPaid.setBill(bill);
                historyPaid.setNote("Đã xác nhận thông tin thanh toán!");
                historyPaid.setStatus(BillStatusConstant.XAC_NHAN_THONG_TIN_THANH_TOAN);
                billHistoryRepository.save(historyPaid);
            } else if (request.getPaymentMethod() == PaymentMethodConstant.TIEN_MAT_VA_CHUYEN_KHOAN) {
                PaymentMethod paymentMethod1 = new PaymentMethod();
                paymentMethod1.setBill(bill);
                paymentMethod1.setTotalMoney(request.getTienMat() != null ? request.getTienMat() : BigDecimal.ZERO);
                paymentMethod1.setNote("Đã thanh toán tiền mặt!!");
                paymentMethod1.setMethod(PaymentMethodConstant.TIEN_MAT);
                paymentMethod1.setType(PaymentMethodConstant.TIEN_KHACH_DUA);
                paymentMethodRepository.save(paymentMethod1);

                paymentMethod.setTotalMoney(request.getTienChuyenKhoan() != null ? request.getTienChuyenKhoan() : BigDecimal.ZERO);
                paymentMethod.setTradingCode(request.getTradingCode());
                paymentMethod.setNote("Đã chuyển khoản!");
                paymentMethod.setMethod(PaymentMethodConstant.CHUYEN_KHOAN);
                paymentMethodRepository.save(paymentMethod);

                BillHistory historyPaid = new BillHistory();
                historyPaid.setBill(bill);
                historyPaid.setNote("Đã xác nhận thông tin thanh toán!");
                historyPaid.setStatus(BillStatusConstant.XAC_NHAN_THONG_TIN_THANH_TOAN);
                billHistoryRepository.save(historyPaid);
            }
        }

        billHistoryRepository.save(history);
        Bill savedBill = billRepository.save(bill);

        // Gửi email nếu khách hàng có email
        if (savedBill.getCustomer() != null && savedBill.getCustomer().getEmail() != null) {
            String emailSubject = "Thông tin hóa đơn - T&T Sport";
            String emailBody = buildEmailBody(savedBill);
            mailUtils.sendEmail(savedBill.getCustomer().getEmail(), emailSubject, emailBody);
        } else if (request.getEmail() != null && !request.getEmail().isEmpty()) {
            String emailSubject = "Thông tin hóa đơn - T&T Sport";
            String emailBody = buildEmailBody(savedBill);
            mailUtils.sendEmail(request.getEmail(), emailSubject, emailBody);
        }

        return savedBill;
    }

    private String buildEmailBody(Bill bill) {
        try {
            // Đọc nội dung file template
            String template = new String(Files.readAllBytes(Paths.get("src/main/resources/templates/template.html")));

            // Xử lý địa chỉ từ bill.address
            String address;
            if (bill.getAddress() != null && bill.getAddress().contains("##")) {
                String[] addressParts = bill.getAddress().split("##");
                if (addressParts.length == 4) {
                    // addressParts[0]: Đường, addressParts[1]: Mã xã, addressParts[2]: Mã huyện, addressParts[3]: Mã tỉnh
                    String specificAddress = addressParts[0]; // Đường
                    String wardCode = addressParts[1];
                    int districtId = Integer.parseInt(addressParts[2]);
                    int provinceId = Integer.parseInt(addressParts[3]);

                    // Lấy tên từ GHNService với districtId truyền thêm
                    String wardName = ghnService.getWardName(districtId, wardCode);
                    String districtName = ghnService.getDistrictName(districtId);
                    String provinceName = ghnService.getProvinceName(provinceId);

                    // Ghép lại địa chỉ hoàn chỉnh
                    address = String.format("%s, %s, %s, %s", specificAddress, wardName, districtName, provinceName);
                } else {
                    address = bill.getAddress(); // Nếu không đủ 4 phần
                }
            } else {
                address = "Tại cửa hàng";
            }


            // Tạo danh sách sản phẩm (productRows)
            StringBuilder productRows = new StringBuilder();
            List<BillDetail> billDetails = billDetailRepository.findByBillId(bill.getId());
            int index = 1;
            for (BillDetail detail : billDetails) {
                productRows.append("<tr>")
                        .append("<td>").append(index++).append("</td>")
                        .append("<td>").append(detail.getShoeDetail().getShoe().getName())
                        .append(" [").append(detail.getShoeDetail().getColor().getName())
                        .append(" - ").append(detail.getShoeDetail().getSize().getName()).append("]</td>")
                        .append("<td>").append(detail.getQuantity()).append("</td>")
                        .append("<td>").append(detail.getPrice()).append(" VNĐ</td>")
                        .append("<td>").append(detail.getPrice().multiply(new BigDecimal(detail.getQuantity()))).append(" VNĐ</td>")
                        .append("</tr>");
            }

            // Tạo phần giảm giá (discountSection)
            String discountSection = "";
            if (bill.getMoneyReduce().compareTo(BigDecimal.ZERO) > 0) {
                discountSection = "<ul style=\"list-style: none; padding: 0;\">" +
                        "<li>Giảm giá: <span style=\"float: right;\"><span class=\"fw-semibold text-success\">" +
                        bill.getMoneyReduce() + " VNĐ</span></span></li>" +
                        "</ul>";
            }

            // Thay thế các placeholder trong template
            return template
                    .replace("${billCode}", bill.getCode())
                    .replace("${customerName}", bill.getCustomerName())
                    .replace("${address}", address) // Thay địa chỉ đã định dạng
                    .replace("${productRows}", productRows.toString())
                    .replace("${discountSection}", discountSection)
                    .replace("${moneyShip}", bill.getMoneyShip().toString())
                    .replace("${totalMoney}", bill.getTotalMoney().add(bill.getMoneyShip()).toString())
                    .replace("${status}", getStatusName(bill.getStatus()));

        } catch (IOException e) {
            e.printStackTrace();
            return "Lỗi khi đọc template email: " + e.getMessage();
        }
    }

    // Hàm lấy tên phương thức thanh toán
    private String getPaymentMethodName(Bill bill) {
        List<PaymentMethod> methods = paymentMethodRepository.findByBillIdAndType(bill.getId(), PaymentMethodConstant.TIEN_KHACH_DUA);
        if (methods.isEmpty()) return "Chưa thanh toán";
        StringBuilder methodNames = new StringBuilder();
        for (PaymentMethod method : methods) {
            if (method.getMethod() == PaymentMethodConstant.TIEN_MAT) {
                methodNames.append("Tiền mặt");
            } else if (method.getMethod() == PaymentMethodConstant.CHUYEN_KHOAN) {
                methodNames.append("Chuyển khoản");
            }
            methodNames.append(" ");
        }
        return methodNames.toString().trim();
    }

    // Hàm lấy tên trạng thái
    private String getStatusName(int status) {
        switch (status) {
            case BillStatusConstant.TAO_DON_HANG: return "Tạo đơn hàng";
            case BillStatusConstant.CHO_XAC_NHAN: return "Chờ xác nhận";
            case BillStatusConstant.DA_XAC_NHAN: return "Đã xác nhận";
            case BillStatusConstant.XAC_NHAN_THONG_TIN_THANH_TOAN: return "Đã thanh toán";
            case BillStatusConstant.CHO_GIAO_HANG: return "Chờ giao hàng";
            case BillStatusConstant.DANG_GIAO_HANG: return "Đang giao hàng";
            case BillStatusConstant.HOAN_THANH: return "Hoàn thành";
            case BillStatusConstant.DA_HUY: return "Đã hủy";
            default: return "Đã thanh toán";
        }
    }

    @Override
    public Bill update(Long id, BillRequest request) {
        BillHistory history = new BillHistory();
        PaymentMethod paymentMethod = new PaymentMethod();
        Bill oldBill = billRepository.findById(id).get();
        Bill billSave = billRepository.save(billConvert.convertRequestToEntity(oldBill, request));
        if (billSave != null) {
            if (billSave.getStatus() == 6) {
                history.setNote("Mua hàng thành công");
            } else if (request.getStatus() == 2) {
                history.setNote("Đang chờ xác nhận");
            } else if (billSave.getStatus() == 0) {
                history.setNote("Chờ thanh toán");
            }
            history.setStatus(billSave.getStatus());
            history.setBill(billSave);
            billHistoryRepository.save(history);
        }
        if (request.getType() == 1 && request.getStatus() == 2) {
            BillHistory billHistory = new BillHistory();
            billSave.setStatus(BillStatusConstant.CHO_GIAO_HANG);
            billRepository.save(billSave);
            billHistory.setNote("Chờ giao hàng");
            billHistory.setStatus(BillStatusConstant.CHO_GIAO_HANG);
            billHistory.setBill(billSave);
            billHistoryRepository.save(billHistory);
        }
        if (request.getPaymentMethod() == 0 && request.getStatus() == 6) {
            paymentMethod.setTotalMoney(request.getTotalMoney() != null ? request.getTotalMoney() : BigDecimal.ZERO);
            paymentMethod.setMethod(request.getPaymentMethod());
            paymentMethod.setBill(billSave);
            paymentMethod.setNote("Đã thanh toán");
            paymentMethodRepository.save(paymentMethod);
        }
        return billSave;
    }

//    public Bill changeStatus(Long id, String note, Boolean isCancel) {
//        Bill bill = billRepository.findById(id).get();
//        BillHistory history = new BillHistory();
//        history.setBill(bill);
//        history.setNote(note);
//
//        List<PaymentMethod> paymentMethods = paymentMethodRepository.findByBillIdAndType(bill.getId(), PaymentMethodConstant.TIEN_KHACH_DUA);
//        Double totalPayment = 0.0;
//        for (PaymentMethod x : paymentMethods) {
//            totalPayment += x.getTotalMoney() != null ? x.getTotalMoney().doubleValue() : 0.0;
//        }
//
//        if (isCancel) {
//            for (BillDetail x : billDetailRepository.findByBillId(bill.getId())) {
//                SanPhamChiTiet shoeDetail = x.getShoeDetail();
//                shoeDetail.setQuantity(shoeDetail.getQuantity() + x.getQuantity());
//                sanPhamChiTietRepository.save(shoeDetail);
//            }
//            if (bill.getVoucher() != null) {
//                Voucher voucher = bill.getVoucher();
//                voucher.setQuantity(voucher.getQuantity() + 1);
//                voucherRepository.save(voucher);
//            }
//            history.setStatus(BillStatusConstant.DA_HUY);
//            bill.setStatus(BillStatusConstant.DA_HUY);
//        } else {
//            BigDecimal totalMoney = bill.getTotalMoney() != null ? bill.getTotalMoney() : BigDecimal.ZERO;
//            BigDecimal moneyShip = bill.getMoneyShip() != null ? bill.getMoneyShip() : BigDecimal.ZERO;
//            if (bill.getStatus() == BillStatusConstant.CHO_THANH_TOAN) {
//                if (BigDecimal.valueOf(totalPayment).compareTo(totalMoney.add(moneyShip)) < 0) {
//                    throw new NgoaiLe("Vui lòng hoàn tất thanh toán!");
//                } else {
//                    history.setStatus(BillStatusConstant.HOAN_THANH);
//                    bill.setStatus(BillStatusConstant.HOAN_THANH);
//                }
//            } else {
//                if (bill.getStatus() == BillStatusConstant.CHO_XAC_NHAN) {
//                    history.setStatus(BillStatusConstant.CHO_GIAO_HANG);
//                    bill.setStatus(BillStatusConstant.CHO_GIAO_HANG);
//                } else {
//                    if (bill.getStatus() == BillStatusConstant.DANG_GIAO_HANG) {
//                        if (BigDecimal.valueOf(totalPayment).compareTo(totalMoney.add(moneyShip)) < 0) {
//                            throw new NgoaiLe("Vui lòng hoàn tất thanh toán!");
//                        }
//                    }
//                    bill.setStatus(bill.getStatus() + 1);
//                    history.setStatus(bill.getStatus());
//                }
//            }
//        }
//        if (bill.getStatus() == BillStatusConstant.HOAN_THANH) {
//            bill.setReceiveDate(System.currentTimeMillis());
//        } else if (bill.getStatus() == BillStatusConstant.DANG_GIAO_HANG) {
//            bill.setShipDate(new Date());
//        } else if (bill.getStatus() == BillStatusConstant.XAC_NHAN_THONG_TIN_THANH_TOAN) {
//            bill.setPayDate(new Date());
//        }
//
//        Bill billSave = billRepository.save(bill);
//        if (billSave != null) {
//            billHistoryRepository.save(history);
//        }
//        return billSave;
//    }


//    @Transactional(rollbackFor = Exception.class)
//    public Bill changeStatus(Long id, String note, Boolean isCancel) {
//        Bill bill = billRepository.findById(id)
//                .orElseThrow(() -> new NgoaiLe("Hóa đơn không tồn tại"));
//
//        BillHistory history = new BillHistory();
//        history.setBill(bill);
//        history.setNote(note);
//
//        List<PaymentMethod> paymentMethods = paymentMethodRepository.findByBillIdAndType(bill.getId(), PaymentMethodConstant.TIEN_KHACH_DUA);
//        Double totalPayment = 0.0;
//        for (PaymentMethod x : paymentMethods) {
//            totalPayment += x.getTotalMoney() != null ? x.getTotalMoney().doubleValue() : 0.0;
//        }
//
//        if (isCancel) {
//            // Return product quantities to inventory
//            for (BillDetail x : billDetailRepository.findByBillId(bill.getId())) {
//                SanPhamChiTiet shoeDetail = x.getShoeDetail();
//                shoeDetail.setQuantity(shoeDetail.getQuantity() + x.getQuantity());
//                sanPhamChiTietRepository.save(shoeDetail);
//            }
//
//            // Only return voucher if bill is in CHO_XAC_NHAN status
//            if (bill.getStatus() == BillStatusConstant.CHO_XAC_NHAN && bill.getVoucher() != null) {
//                Voucher voucher = bill.getVoucher();
//                voucher.setQuantity(voucher.getQuantity() + 1);
//                voucherRepository.save(voucher);
//            }
//
//            history.setStatus(BillStatusConstant.DA_HUY);
//            bill.setStatus(BillStatusConstant.DA_HUY);
//        } else {
//            BigDecimal totalMoney = bill.getTotalMoney() != null ? bill.getTotalMoney() : BigDecimal.ZERO;
//            BigDecimal moneyShip = bill.getMoneyShip() != null ? bill.getMoneyShip() : BigDecimal.ZERO;
//
//            if (bill.getStatus() == BillStatusConstant.CHO_THANH_TOAN) {
//                if (BigDecimal.valueOf(totalPayment).compareTo(totalMoney.add(moneyShip)) < 0) {
//                    throw new NgoaiLe("Vui lòng hoàn tất thanh toán!");
//                } else {
//                    history.setStatus(BillStatusConstant.HOAN_THANH);
//                    bill.setStatus(BillStatusConstant.HOAN_THANH);
//                }
//            } else if (bill.getStatus() == BillStatusConstant.CHO_XAC_NHAN) {
//                // Deduct product quantities when moving to DA_XAC_NHAN
//                for (BillDetail x : billDetailRepository.findByBillId(bill.getId())) {
//                    SanPhamChiTiet shoeDetail = x.getShoeDetail();
//                    if (shoeDetail.getQuantity() < x.getQuantity()) {
//                        throw new NgoaiLe("Sản phẩm " + shoeDetail.getShoe().getName() + " [" +
//                                shoeDetail.getColor().getName() + "-" + shoeDetail.getSize().getName() +
//                                "] không đủ số lượng để giao!");
//                    }
//                    shoeDetail.setQuantity(shoeDetail.getQuantity() - x.getQuantity());
//                    sanPhamChiTietRepository.save(shoeDetail);
//                }
//                history.setStatus(BillStatusConstant.DA_XAC_NHAN);
//                bill.setStatus(BillStatusConstant.DA_XAC_NHAN);
//            } else if (bill.getStatus() == BillStatusConstant.DA_XAC_NHAN) {
//                history.setStatus(BillStatusConstant.CHO_GIAO_HANG);
//                bill.setStatus(BillStatusConstant.CHO_GIAO_HANG);
//            } else {
//                if (bill.getStatus() == BillStatusConstant.DANG_GIAO_HANG) {
//                    if (BigDecimal.valueOf(totalPayment).compareTo(totalMoney.add(moneyShip)) < 0) {
//                        throw new NgoaiLe("Vui lòng hoàn tất thanh toán!");
//                    }
//                }
//                bill.setStatus(bill.getStatus() + 1);
//                history.setStatus(bill.getStatus());
//            }
//        }
//
//        // Update relevant dates based on status
//        if (bill.getStatus() == BillStatusConstant.HOAN_THANH) {
//            bill.setReceiveDate(System.currentTimeMillis());
//        } else if (bill.getStatus() == BillStatusConstant.DANG_GIAO_HANG) {
//            bill.setShipDate(new Date());
//        } else if (bill.getStatus() == BillStatusConstant.XAC_NHAN_THONG_TIN_THANH_TOAN) {
//            bill.setPayDate(new Date());
//        }
//
//        Bill billSave = billRepository.save(bill);
//        if (billSave != null) {
//            billHistoryRepository.save(history);
//        }
//        return billSave;
//    }


    @Transactional(rollbackFor = Exception.class)
    public Bill changeStatus(Long id, String note, Boolean isCancel) {
        Bill bill = billRepository.findById(id)
                .orElseThrow(() -> new NgoaiLe("Hóa đơn không tồn tại"));

        BillHistory history = new BillHistory();
        history.setBill(bill);
        history.setNote(note);

        List<PaymentMethod> paymentMethods = paymentMethodRepository.findByBillIdAndType(bill.getId(), PaymentMethodConstant.TIEN_KHACH_DUA);
        Double totalPayment = 0.0;
        for (PaymentMethod x : paymentMethods) {
            totalPayment += x.getTotalMoney() != null ? x.getTotalMoney().doubleValue() : 0.0;
        }

        if (isCancel) {
            if (bill.getStatus() == BillStatusConstant.CHO_XAC_NHAN) {
                // Only restore voucher at CHO_XAC_NHAN status
//                if (bill.getVoucher() != null) {
//                    Voucher voucher = bill.getVoucher();
//                    voucher.setQuantity(voucher.getQuantity() + 1);
//                    voucherRepository.save(voucher);
//                }
                // Do NOT restore product quantities at CHO_XAC_NHAN
            } else {
                // Restore product quantities for DA_XAC_NHAN or later statuses
                for (BillDetail x : billDetailRepository.findByBillId(bill.getId())) {
                    SanPhamChiTiet shoeDetail = x.getShoeDetail();
                    shoeDetail.setQuantity(shoeDetail.getQuantity() + x.getQuantity());
                    sanPhamChiTietRepository.save(shoeDetail);
                }
                // Do NOT restore voucher at DA_XAC_NHAN or later
            }

            history.setStatus(BillStatusConstant.DA_HUY);
            bill.setStatus(BillStatusConstant.DA_HUY);
        } else {
            BigDecimal totalMoney = bill.getTotalMoney() != null ? bill.getTotalMoney() : BigDecimal.ZERO;
            BigDecimal moneyShip = bill.getMoneyShip() != null ? bill.getMoneyShip() : BigDecimal.ZERO;

            if (bill.getStatus() == BillStatusConstant.CHO_THANH_TOAN) {
                if (BigDecimal.valueOf(totalPayment).compareTo(totalMoney.add(moneyShip)) < 0) {
                    throw new NgoaiLe("Vui lòng hoàn tất thanh toán!");
                } else {
                    history.setStatus(BillStatusConstant.HOAN_THANH);
                    bill.setStatus(BillStatusConstant.HOAN_THANH);
                }
            } else if (bill.getStatus() == BillStatusConstant.CHO_XAC_NHAN) {
                // Check product availability and status when moving to DA_XAC_NHAN
                for (BillDetail x : billDetailRepository.findByBillId(bill.getId())) {
                    SanPhamChiTiet shoeDetail = x.getShoeDetail();
                    SanPham sanPham = shoeDetail.getShoe();

                    // Check if product is discontinued
                    if (sanPham.getDeleted()) {
                        throw new NgoaiLe("Không thể xác nhận đơn hàng! Sản phẩm " + sanPham.getName() +
                                " [" + shoeDetail.getColor().getName() + "-" + shoeDetail.getSize().getName() +
                                "] đã ngừng bán.");
                    }

                    // Check if product is out of stock
                    if (shoeDetail.getQuantity() < x.getQuantity()) {
                        throw new NgoaiLe("Không thể xác nhận đơn hàng! Sản phẩm " + sanPham.getName() +
                                " [" + shoeDetail.getColor().getName() + "-" + shoeDetail.getSize().getName() +
                                "] chỉ còn " + shoeDetail.getQuantity() + " trong kho.");
                    }

                    // Deduct inventory
                    shoeDetail.setQuantity(shoeDetail.getQuantity() - x.getQuantity());
                    sanPhamChiTietRepository.save(shoeDetail);
                }
                history.setStatus(BillStatusConstant.DA_XAC_NHAN);
                bill.setStatus(BillStatusConstant.DA_XAC_NHAN);
            } else if (bill.getStatus() == BillStatusConstant.DA_XAC_NHAN) {
                history.setStatus(BillStatusConstant.CHO_GIAO_HANG);
                bill.setStatus(BillStatusConstant.CHO_GIAO_HANG);
            } else {
                if (bill.getStatus() == BillStatusConstant.DANG_GIAO_HANG) {
                    if (BigDecimal.valueOf(totalPayment).compareTo(totalMoney.add(moneyShip)) < 0) {
                        throw new NgoaiLe("Vui lòng hoàn tất thanh toán!");
                    }
                }
                bill.setStatus(bill.getStatus() + 1);
                history.setStatus(bill.getStatus());
            }
        }

        // Update relevant dates based on status
        if (bill.getStatus() == BillStatusConstant.HOAN_THANH) {
            bill.setReceiveDate(System.currentTimeMillis());
        } else if (bill.getStatus() == BillStatusConstant.DANG_GIAO_HANG) {
            bill.setShipDate(new Date());
        } else if (bill.getStatus() == BillStatusConstant.XAC_NHAN_THONG_TIN_THANH_TOAN) {
            bill.setPayDate(new Date());
        }

        Bill billSave = billRepository.save(bill);
        if (billSave != null) {
            billHistoryRepository.save(history);
        }
        return billSave;
    }
    public Bill changeInfoCustomer(Long id, BillRequest request) {
        Bill bill = billRepository.findById(id).orElse(null);
        bill.setCustomerName(request.getCustomerName());
        bill.setPhoneNumber(request.getPhoneNumber());
        bill.setEmail(request.getEmail());
        bill.setAddress(request.getAddress());
        bill.setMoneyShip(request.getMoneyShip() != null ? request.getMoneyShip() : BigDecimal.ZERO);

        BillHistory history = new BillHistory();
        history.setBill(bill);
        history.setStatus(BillStatusConstant.CHINH_SUA_DON_HANG);
        history.setNote("Cập nhật thông tin khách hàng");
        billHistoryRepository.save(history);
        return billRepository.save(bill);
    }



//    @Override
//    @Transactional(rollbackFor = NgoaiLe.class)
//    public ResponseObject createBillClient(BillClientRequest request) {
//        Bill bill = new Bill();
//        BillHistory billHistory = new BillHistory();
//        if (request.getVoucher() != null) {
//            int updatedRows = voucherRepository.decreaseQuantityIfAvailable(request.getVoucher());
//            if (updatedRows == 0) {
//                throw new NgoaiLe("Voucher đã hết số lượng hoặc không tồn tại!");
//            }
//        }
//        if (request.getAccount() != null) {
//            bill.setCustomer(accountRepository.findById(request.getAccount()).orElse(null));
//        }
//        bill.setStatus(BillStatusConstant.CHO_XAC_NHAN);
//        bill.setCode(this.genBillCode());
//        bill.setType(TyperOrderConstant.GIAO_HANG);
//        bill.setNote(request.getNote());
//        bill.setPhoneNumber(request.getPhoneNumber());
//        bill.setCustomerName(request.getCustomerName());
//        bill.setAddress(request.getSpecificAddress() + "##" + request.getWard() + "##" + request.getDistrict() + "##" + request.getProvince());
//        bill.setMoneyShip(request.getMoneyShip());
//        bill.setMoneyReduce(request.getMoneyReduce());
//        bill.setTotalMoney(request.getTotalMoney());
//        if(request.getVoucher() != null){
//            Voucher voucher = voucherRepository.findById(request.getVoucher()).get();
//            voucher.setQuantity(voucher.getQuantity()-1);
//            voucherRepository.save(voucher);
//            bill.setVoucher(voucher);
//        }
//
//        Bill billSave = billRepository.save(bill);
//        billHistory.setBill(billSave);
//        billHistory.setStatus(billSave.getStatus());
//        billHistory.setNote("Chờ xác nhận");
//        billHistoryRepository.save(billHistory);
//
//        for (CartClientRequest x : request.getCarts()) {
//            SanPhamChiTiet shoeDetail = sanPhamChiTietRepository.findById(x.getId()).get();
//            BillDetail billDetail = new BillDetail();
//            billDetail.setBill(bill);
//            billDetail.setQuantity(x.getQuantity());
//            billDetail.setShoeDetail(shoeDetail);
//            billDetail.setPrice(shoeDetail.getPrice());
//            billDetail.setStatus(false);
//            billDetailRepository.save(billDetail);
//            if(shoeDetail.getQuantity() <= 0){
//                throw new NgoaiLe("Sản phẩm " + shoeDetail.getShoe().getName()
//                        + " [" + shoeDetail.getColor().getName()+"-" + shoeDetail.getSize().getName()+"] đã hết hàng!");
//            }
//            if(shoeDetail.getQuantity() < x.getQuantity()){
//                throw new NgoaiLe(shoeDetail.getShoe().getName()
//                        + " [" + shoeDetail.getColor().getName()+"-" + shoeDetail.getSize().getName()+"] chỉ được mua tối đa " + shoeDetail.getQuantity() + " sản phẩm!");
//            }
//            shoeDetail.setQuantity(shoeDetail.getQuantity() - x.getQuantity());
//            sanPhamChiTietRepository.save(shoeDetail);
//        }
////        if (bill.getCustomer() != null) {
////            Account account = bill.getCustomer();
////            Notification notification = new Notification();
////            notification.setTitle("Đơn hàng của bạn đã được đặt");
////            notification.setContent("Xin chào " + account.getName() + ", đơn hàng với mã vận đơn " +
////                    bill.getCode() + " đã được hệ thống ghi nhận và đang chờ nhân viên xác nhận. " +
////                    "Cảm ơn bạn đã dành thời gian cho NiceShoes!");
////            notification.setAccount(account);
////            notification.setType(NotificationType.CHUA_DOC);
////            notificationRepository.save(notification);
////        }
//        return new ResponseObject(bill);
//    }





    private String buildClientEmailBody(Bill bill) {
        try {
            String template = new String(Files.readAllBytes(Paths.get("src/main/resources/templates/templateClient.html")));

            // Format address
            String address = bill.getAddress() != null && bill.getAddress().contains("##") ?
                    formatAddress(bill.getAddress()) : "Không có địa chỉ";

            // Build product rows
            StringBuilder productRows = new StringBuilder();
            List<BillDetail> billDetails = billDetailRepository.findByBillId(bill.getId());
            for (BillDetail detail : billDetails) {
                productRows.append("<tr>")
                        .append("<td>").append(detail.getShoeDetail().getShoe().getName()).append(" [")
                        .append(detail.getShoeDetail().getColor().getName()).append(" - ")
                        .append(detail.getShoeDetail().getSize().getName()).append("]</td>")
                        .append("<td>").append(detail.getQuantity()).append("</td>")
                        .append("<td>").append(detail.getPrice()).append(" VNĐ</td>")
                        .append("<td>").append(detail.getPrice().multiply(new BigDecimal(detail.getQuantity()))).append(" VNĐ</td>")
                        .append("</tr>");
            }

            // Note section
            String noteSection = bill.getNote() != null && !bill.getNote().isEmpty() ?
                    "<p><strong>Ghi chú:</strong> " + bill.getNote() + "</p>" : "";

            // Replace placeholders
            return template
                    .replace("${billCode}", bill.getCode())
                    .replace("${createDate}", bill.getCreateAt().format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm")))
                    .replace("${subTotal}", bill.getTotalMoney().toString())
                    .replace("${discount}", bill.getMoneyReduce().toString())
                    .replace("${shippingFee}", bill.getMoneyShip().toString())
                    .replace("${total}", bill.getTotalMoney().add(bill.getMoneyShip()).toString())
                    .replace("${productRows}", productRows.toString())
                    .replace("${customerName}", bill.getCustomerName())
                    .replace("${phoneNumber}", bill.getPhoneNumber() != null ? bill.getPhoneNumber() : "Không có")
                    .replace("${address}", address)
                    .replace("${noteSection}", noteSection);

        } catch (IOException e) {
            e.printStackTrace();
            return "Lỗi khi tạo email: " + e.getMessage();
        }
    }

    private String formatAddress(String rawAddress) {
        String[] parts = rawAddress.split("##");
        if (parts.length == 4) {
            String specificAddress = parts[0];
            String wardCode = parts[1];
            int districtId = Integer.parseInt(parts[2]);
            int provinceId = Integer.parseInt(parts[3]);
            return String.format("%s, %s, %s, %s",
                    specificAddress,
                    ghnService.getWardName(districtId, wardCode),
                    ghnService.getDistrictName(districtId),
                    ghnService.getProvinceName(provinceId));
        }
        return rawAddress;
    }

//    @Override
//    @Transactional(rollbackFor = NgoaiLe.class)
//    public ResponseObject createBillClientVnpay(BillClientRequest request, String code) {
//        Bill bill = new Bill();
//        BillHistory billHistory = new BillHistory();
//        if (request.getAccount() != null) {
//            bill.setCustomer(accountRepository.findById(request.getAccount()).orElse(null));
//        }
//        bill.setStatus(BillStatusConstant.CHO_XAC_NHAN);
//        if(request.getVoucher() != null){
//            Voucher voucher = voucherRepository.findById(request.getVoucher()).get();
//            voucher.setQuantity(voucher.getQuantity()-1);
//            voucherRepository.save(voucher);
//            bill.setVoucher(voucher);
//        }
//        bill.setCode(this.genBillCode());
//        bill.setType(TyperOrderConstant.GIAO_HANG);
//        bill.setNote(request.getNote());
//        bill.setPhoneNumber(request.getPhoneNumber());
//        bill.setCustomerName(request.getCustomerName());
//        bill.setAddress(request.getSpecificAddress() + "##" + request.getWard() + "##" + request.getDistrict() + "##" + request.getProvince());
//        bill.setMoneyShip(request.getMoneyShip());
//        bill.setMoneyReduce(request.getMoneyReduce());
//        bill.setTotalMoney(request.getTotalMoney());
//        if (request.getVoucher() != null) {
//            bill.setVoucher(voucherRepository.findById(request.getVoucher()).get());
//        }
//
//        Bill billSave = billRepository.save(bill);
//        billHistory.setBill(billSave);
//        billHistory.setStatus(billSave.getStatus());
//        billHistory.setNote("Chờ xác nhận");
//        billHistoryRepository.save(billHistory);
//
//        PaymentMethod paymentMethod = new PaymentMethod();
//        paymentMethod.setBill(billSave);
//        paymentMethod.setType(PaymentMethodConstant.TIEN_KHACH_DUA);
//        paymentMethod.setMethod(PaymentMethodConstant.CHUYEN_KHOAN);
//        paymentMethod.setTradingCode(code);
//        paymentMethod.setTotalMoney(billSave.getTotalMoney().add(billSave.getMoneyShip()));
//        paymentMethod.setNote("Đã thanh toán");
//        paymentMethodRepository.save(paymentMethod);
//
//        for (CartClientRequest x : request.getCarts()) {
//            SanPhamChiTiet shoeDetail = sanPhamChiTietRepository.findById(x.getId()).get();
//            BillDetail billDetail = new BillDetail();
//            billDetail.setBill(bill);
//            billDetail.setQuantity(x.getQuantity());
//            billDetail.setShoeDetail(shoeDetail);
//            billDetail.setPrice(shoeDetail.getPrice());
//            billDetail.setStatus(false);
//            billDetailRepository.save(billDetail);
//            shoeDetail.setQuantity(shoeDetail.getQuantity() - x.getQuantity());
//            if(shoeDetail.getQuantity() < 0){
//                throw new NgoaiLe("Sản phẩm này đã hết hàng!");
//            }
//            sanPhamChiTietRepository.save(shoeDetail);
//        }
////        if (bill.getCustomer() != null) {
////            Account account = bill.getCustomer();
////            Notification notification = new Notification();
////            notification.setTitle("Đơn hàng của bạn đã được đặt");
////            notification.setContent("Xin chào " + account.getName() + ", đơn hàng với mã vận đơn " +
////                    bill.getCode() + " đã được hệ thống ghi nhận và đang chờ nhân viên xác nhận. " +
////                    "Cảm ơn bạn đã dành thời gian cho NiceShoes!");
////            notification.setAccount(account);
////            notification.setType(NotificationType.CHUA_DOC);
////            notificationRepository.save(notification);
////        }
//        return new ResponseObject(bill);
//    }

    @Transactional(rollbackFor = NgoaiLe.class)
    public Bill updateVoucher(Long billId, Long newVoucherId) {
        Bill bill = billRepository.findById(billId)
                .orElseThrow(() -> new NgoaiLe("Hóa đơn không tồn tại"));

        Voucher oldVoucher = bill.getVoucher(); // Voucher cũ (50k)
        Voucher newVoucher = newVoucherId != null ? voucherRepository.findById(newVoucherId)
                .orElseThrow(() -> new NgoaiLe("Voucher mới không tồn tại")) : null;

        // Hoàn lại số lượng voucher cũ nếu có
        if (oldVoucher != null && !oldVoucher.getId().equals(newVoucherId)) {
            oldVoucher.setQuantity(oldVoucher.getQuantity() + 1);
            voucherRepository.save(oldVoucher);
        }

        // Giảm số lượng voucher mới nếu áp dụng
        if (newVoucher != null) {
            if (newVoucher.getQuantity() <= 0) {
                throw new NgoaiLe("Voucher " + newVoucher.getCode() + " đã hết số lượng!");
            }
//            if (bill.getTotalMoney().compareTo(newVoucher.getMinBillValue()) < 0) {
//                throw new NgoaiLe("Tổng tiền không đủ để áp dụng voucher " + newVoucher.getCode() + "!");
//            }
            newVoucher.setQuantity(newVoucher.getQuantity() - 1);
            voucherRepository.save(newVoucher);
            bill.setVoucher(newVoucher);
        } else {
            bill.setVoucher(null);
        }

        // Cập nhật lại moneyReduce và totalMoney
        updateBillTotals(bill);

        // Ghi lịch sử thay đổi
//        BillHistory history = new BillHistory();
//        history.setBill(bill);
//        history.setNote(newVoucher != null
//                ? "Đã áp dụng voucher " + newVoucher.getCode()
//                : "Đã xóa voucher khỏi hóa đơn");
//        history.setStatus(BillStatusConstant.CHINH_SUA_DON_HANG);
//        billHistoryRepository.save(history);

        return billRepository.save(bill);
    }

    private void updateBillTotals(Bill bill) {
        Double caculateTotalMoney = 0.0;
        for (BillDetail x : billDetailRepository.findByBillId(bill.getId())) {
            caculateTotalMoney += x.getQuantity() * x.getPrice().doubleValue();
        }
        bill.setTotalMoney(BigDecimal.valueOf(caculateTotalMoney));

        if (bill.getVoucher() != null) {
            Voucher voucher = bill.getVoucher();
            BigDecimal totalMoney = bill.getTotalMoney() != null ? bill.getTotalMoney() : BigDecimal.ZERO;
            BigDecimal minBillValue = voucher.getMinBillValue() != null ? voucher.getMinBillValue() : BigDecimal.ZERO;
            if (totalMoney.compareTo(minBillValue) >= 0) {
                BigDecimal calculatedDiscount = totalMoney.multiply(BigDecimal.valueOf(voucher.getPercentReduce()).divide(BigDecimal.valueOf(100)));
                BigDecimal finalDiscount = calculatedDiscount.min(voucher.getMaxBillValue());
                bill.setMoneyReduce(finalDiscount);
            } else {
                bill.setMoneyReduce(BigDecimal.ZERO);
            }
        } else {
            bill.setMoneyReduce(BigDecimal.ZERO);
        }

        BigDecimal totalMoney = bill.getTotalMoney() != null ? bill.getTotalMoney() : BigDecimal.ZERO;
        BigDecimal moneyReduce = bill.getMoneyReduce() != null ? bill.getMoneyReduce() : BigDecimal.ZERO;
        bill.setTotalMoney(totalMoney.subtract(moneyReduce));
        billRepository.save(bill);
    }


    public List<StatisticBillStatus> statisticBillStatus() {
        return billRepository.statisticBillStatus();
    }

}