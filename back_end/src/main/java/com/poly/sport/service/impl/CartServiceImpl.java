////package com.poly.sport.service.impl;
////
////
////import com.poly.sport.entity.Cart;
////import com.poly.sport.entity.CartDetail;
////import com.poly.sport.entity.SanPhamChiTiet;
////import com.poly.sport.infrastructure.common.ResponseObject;
////import com.poly.sport.infrastructure.exception.NgoaiLe;
////import com.poly.sport.infrastructure.request.CartClientRequest;
////import com.poly.sport.infrastructure.response.CartResponse;
////import com.poly.sport.repository.AccountRepository;
////import com.poly.sport.repository.ICartDetailRepository;
////import com.poly.sport.repository.ICartRepository;
////import com.poly.sport.repository.SanPhamChiTietRepository;
////import com.poly.sport.service.CartService;
////import org.springframework.beans.factory.annotation.Autowired;
////import org.springframework.stereotype.Service;
////
////import java.util.List;
////
////@Service
////public class CartServiceImpl implements CartService {
////    @Autowired
////    private ICartRepository cartRepository;
////    @Autowired
////    private AccountRepository accountRepository;
////    @Autowired
////    private SanPhamChiTietRepository shoeDetailRepository;
////    @Autowired
////    private ICartDetailRepository cartDetailRepository;
////
////    @Override
////    public List<CartResponse> getListCart(Long idAccount) {
////        return cartRepository.getListCart(idAccount);
////    }
////
////    @Override
////    public ResponseObject create(CartClientRequest request) {
////        SanPhamChiTiet shoeDetail = shoeDetailRepository.findById(request.getShoeDetail()).get();
////        Cart cartCheck = cartRepository.findByAccountId(request.getId());
////        if (cartCheck == null) {
////            Cart cart = new Cart();
////            cart.setAccount(accountRepository.findById(request.getId()).orElse(null));
////            cartCheck = cartRepository.save(cart);
////        }
////
////        CartDetail cartDetailCheck = cartDetailRepository.findByCartIdAndShoeDetailId(cartCheck.getId(), request.getShoeDetail());
////        if (cartDetailCheck != null) {
////            if (request.getQuantity() <= 0) {
////                throw new NgoaiLe("Số lượng phải >= 0!");
////            }
////            if (cartDetailCheck.getQuantity() + request.getQuantity() > shoeDetail.getQuantity()) {
////                throw new NgoaiLe("Quá số lượng cho phép!");
////            }
////            if (request.getQuantity() > 10) {
////                throw new NgoaiLe("Chỉ được mua tối đa 10 sản phẩm!");
////            }
////            cartDetailCheck.setQuantity(cartDetailCheck.getQuantity() + request.getQuantity());
////            cartDetailRepository.save(cartDetailCheck);
////        } else {
////            CartDetail cartDetail = new CartDetail();
////            cartDetail.setCart(cartCheck);
////            cartDetail.setQuantity(request.getQuantity());
////            if (request.getQuantity() > shoeDetail.getQuantity()) {
////                throw new NgoaiLe("Quá số lượng cho phép!");
////            }
////            cartDetail.setShoeDetail(shoeDetailRepository.findById(request.getShoeDetail()).get());
////            cartDetailRepository.save(cartDetail);
////        }
////        return new ResponseObject("OK");
////    }
////
////    @Override
////    public ResponseObject updateQuantity(CartClientRequest request) {
////        CartDetail cartDetail = cartDetailRepository.findById(request.getId()).get();
////        if (request.getQuantity() <= 0) {
////            throw new NgoaiLe("Số lượng phải >= 0!");
////        }
////        if (request.getQuantity() > cartDetail.getShoeDetail().getQuantity()) {
////            throw new NgoaiLe("Quá số lượng cho phép!");
////        }
////        if (request.getQuantity() > 10) {
////            throw new NgoaiLe("Chỉ được mua tối đa 10 sản phẩm!");
////        }
////        cartDetail.setQuantity(request.getQuantity());
////        cartDetailRepository.save(cartDetail);
////        return new ResponseObject("ok");
////    }
////
////    @Override
////    public ResponseObject deleteById(Long idCartDetail) {
////        cartDetailRepository.deleteById(idCartDetail);
////        return new ResponseObject("OK");
////    }
////
////    @Override
////    public ResponseObject deleteAll(Long idAccount) {
////        Cart cart = cartRepository.findByAccountId(idAccount);
////        List<CartDetail> cartDetails = cartDetailRepository.findByCartId(cart.getId());
////        cartDetailRepository.deleteAll(cartDetails);
////        return new ResponseObject("OK");
////    }
////}
//
//
//package com.poly.sport.service.impl;
//
//import com.poly.sport.entity.Cart;
//import com.poly.sport.entity.CartDetail;
//import com.poly.sport.entity.SanPhamChiTiet;
//import com.poly.sport.infrastructure.common.ResponseObject;
//import com.poly.sport.infrastructure.exception.NgoaiLe;
//import com.poly.sport.infrastructure.request.CartClientRequest;
//import com.poly.sport.infrastructure.response.CartResponse;
//import com.poly.sport.repository.AccountRepository;
//import com.poly.sport.repository.ICartDetailRepository;
//import com.poly.sport.repository.ICartRepository;
//import com.poly.sport.repository.SanPhamChiTietRepository;
//import com.poly.sport.service.CartService;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class CartServiceImpl implements CartService {
//    @Autowired
//    private ICartRepository cartRepository;
//    @Autowired
//    private AccountRepository accountRepository;
//    @Autowired
//    private SanPhamChiTietRepository shoeDetailRepository;
//    @Autowired
//    private ICartDetailRepository cartDetailRepository;
//
//    @Override
//    public List<CartResponse> getListCart(Long idAccount) {
//        return cartRepository.getListCart(idAccount);
//    }
//
//    @Override
//    public ResponseObject create(CartClientRequest request) {
//        SanPhamChiTiet shoeDetail = shoeDetailRepository.findById(request.getShoeDetail())
//                .orElseThrow(() -> new NgoaiLe("Sản phẩm không tồn tại!"));
//
//        // Kiểm tra trạng thái deleted của sản phẩm
//        if (shoeDetail.getShoe().getDeleted()) {
//            throw new NgoaiLe("Sản phẩm đã ngừng bán!");
//        }
//
//        Cart cartCheck = cartRepository.findByAccountId(request.getId());
//        if (cartCheck == null) {
//            Cart cart = new Cart();
//            cart.setAccount(accountRepository.findById(request.getId())
//                    .orElseThrow(() -> new NgoaiLe("Tài khoản không tồn tại!")));
//            cartCheck = cartRepository.save(cart);
//        }
//
//        CartDetail cartDetailCheck = cartDetailRepository.findByCartIdAndShoeDetailId(cartCheck.getId(), request.getShoeDetail());
//        if (cartDetailCheck != null) {
//            if (request.getQuantity() <= 0) {
//                throw new NgoaiLe("Số lượng phải >= 0!");
//            }
//            if (cartDetailCheck.getQuantity() + request.getQuantity() > shoeDetail.getQuantity()) {
//                throw new NgoaiLe("Quá số lượng cho phép!");
//            }
//            if (request.getQuantity() > 10) {
//                throw new NgoaiLe("Chỉ được mua tối đa 10 sản phẩm!");
//            }
//            cartDetailCheck.setQuantity(cartDetailCheck.getQuantity() + request.getQuantity());
//            cartDetailRepository.save(cartDetailCheck);
//        } else {
//            CartDetail cartDetail = new CartDetail();
//            cartDetail.setCart(cartCheck);
//            cartDetail.setQuantity(request.getQuantity());
//            if (request.getQuantity() > shoeDetail.getQuantity()) {
//                throw new NgoaiLe("Quá số lượng cho phép!");
//            }
//            cartDetail.setShoeDetail(shoeDetail);
//            cartDetailRepository.save(cartDetail);
//        }
//        return new ResponseObject("OK");
//    }
//
//    @Override
//    public ResponseObject updateQuantity(CartClientRequest request) {
//        CartDetail cartDetail = cartDetailRepository.findById(request.getId())
//                .orElseThrow(() -> new NgoaiLe("Chi tiết giỏ hàng không tồn tại!"));
//
//        // Kiểm tra trạng thái deleted của sản phẩm
//        if (cartDetail.getShoeDetail().getShoe().getDeleted()) {
//            throw new NgoaiLe("Sản phẩm đã ngừng bán!");
//        }
//
//        if (request.getQuantity() <= 0) {
//            throw new NgoaiLe("Số lượng phải >= 0!");
//        }
//        if (request.getQuantity() > cartDetail.getShoeDetail().getQuantity()) {
//            throw new NgoaiLe("Quá số lượng cho phép!");
//        }
//        if (request.getQuantity() > 10) {
//            throw new NgoaiLe("Chỉ được mua tối đa 10 sản phẩm!");
//        }
//        cartDetail.setQuantity(request.getQuantity());
//        cartDetailRepository.save(cartDetail);
//        return new ResponseObject("ok");
//    }
//
//    @Override
//    public ResponseObject deleteById(Long idCartDetail) {
//        cartDetailRepository.deleteById(idCartDetail);
//        return new ResponseObject("OK");
//    }
//
//    @Override
//    public ResponseObject deleteAll(Long idAccount) {
//        Cart cart = cartRepository.findByAccountId(idAccount);
//        if (cart != null) {
//            List<CartDetail> cartDetails = cartDetailRepository.findByCartId(cart.getId());
//            cartDetailRepository.deleteAll(cartDetails);
//        }
//        return new ResponseObject("OK");
//    }
//}



package com.poly.sport.service.impl;

import com.poly.sport.entity.Cart;
import com.poly.sport.entity.CartDetail;
import com.poly.sport.entity.SanPhamChiTiet;
import com.poly.sport.infrastructure.common.ResponseObject;
import com.poly.sport.infrastructure.exception.NgoaiLe;
import com.poly.sport.infrastructure.request.CartClientRequest;
import com.poly.sport.infrastructure.response.CartResponse;
import com.poly.sport.repository.AccountRepository;
import com.poly.sport.repository.ICartDetailRepository;
import com.poly.sport.repository.ICartRepository;
import com.poly.sport.repository.SanPhamChiTietRepository;
import com.poly.sport.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CartServiceImpl implements CartService {
    @Autowired
    private ICartRepository cartRepository;
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private SanPhamChiTietRepository shoeDetailRepository;
    @Autowired
    private ICartDetailRepository cartDetailRepository;

    @Override
    public List<CartResponse> getListCart(Long idAccount) {
        return cartRepository.getListCart(idAccount);
    }

    @Override
    @Transactional
    public ResponseObject create(CartClientRequest request) {
        SanPhamChiTiet shoeDetail = shoeDetailRepository.findById(request.getShoeDetail())
                .orElseThrow(() -> new NgoaiLe("Sản phẩm không tồn tại!"));

        // Kiểm tra trạng thái deleted của sản phẩm
        if (shoeDetail.getShoe().getDeleted()) {
            throw new NgoaiLe("Sản phẩm đã ngừng bán!");
        }

        // Kiểm tra số lượng yêu cầu
        if (request.getQuantity() <= 0) {
            throw new NgoaiLe("Số lượng phải >= 0!");
        }
        if (request.getQuantity() > 20) {
            throw new NgoaiLe("Chỉ được mua tối đa 20 sản phẩm!");
        }

        Cart cartCheck = cartRepository.findByAccountId(request.getId());
        if (cartCheck == null) {
            Cart cart = new Cart();
            cart.setAccount(accountRepository.findById(request.getId())
                    .orElseThrow(() -> new NgoaiLe("Tài khoản không tồn tại!")));
            cartCheck = cartRepository.save(cart);
        }

        CartDetail cartDetailCheck = cartDetailRepository.findByCartIdAndShoeDetailId(cartCheck.getId(), request.getShoeDetail());
        if (cartDetailCheck != null) {
            int newQuantity = cartDetailCheck.getQuantity() + request.getQuantity();
            if (newQuantity > 20) {
                throw new NgoaiLe("Tổng số lượng sản phẩm này đã đạt tối đa trong giỏ hàng.");
            }
            if (newQuantity > shoeDetail.getQuantity()) {
                throw new NgoaiLe("Quá số lượng cho phép trong kho!");
            }
            cartDetailCheck.setQuantity(newQuantity);
            cartDetailRepository.save(cartDetailCheck);
        } else {
            if (request.getQuantity() > shoeDetail.getQuantity()) {
                throw new NgoaiLe("Quá số lượng cho phép trong kho!");
            }
            CartDetail cartDetail = new CartDetail();
            cartDetail.setCart(cartCheck);
            cartDetail.setQuantity(request.getQuantity());
            cartDetail.setShoeDetail(shoeDetail);
            cartDetailRepository.save(cartDetail);
        }
        return new ResponseObject("OK");
    }

    @Override
    @Transactional
    public ResponseObject updateQuantity(CartClientRequest request) {
        CartDetail cartDetail = cartDetailRepository.findById(request.getId())
                .orElseThrow(() -> new NgoaiLe("Chi tiết giỏ hàng không tồn tại!"));

        // Kiểm tra trạng thái deleted của sản phẩm
        if (cartDetail.getShoeDetail().getShoe().getDeleted()) {
            throw new NgoaiLe("Sản phẩm đã ngừng bán!");
        }

        // Kiểm tra số lượng yêu cầu
        if (request.getQuantity() <= 0) {
            throw new NgoaiLe("Số lượng phải >= 0!");
        }
        if (request.getQuantity() > 20) {
            throw new NgoaiLe("Tổng số lượng sản phẩm của bạn quá lớn vui lòng liên hệ 0335867600 để được hỗ trợ đặt hàng.");
        }
        if (request.getQuantity() > cartDetail.getShoeDetail().getQuantity()) {
            throw new NgoaiLe("Quá số lượng cho phép trong kho!");
        }

        cartDetail.setQuantity(request.getQuantity());
        cartDetailRepository.save(cartDetail);
        return new ResponseObject("ok");
    }

    @Override
    @Transactional
    public ResponseObject deleteById(Long idCartDetail) {
        cartDetailRepository.deleteById(idCartDetail);
        return new ResponseObject("OK");
    }

    @Override
    @Transactional
    public ResponseObject deleteAll(Long idAccount) {
        Cart cart = cartRepository.findByAccountId(idAccount);
        if (cart != null) {
            List<CartDetail> cartDetails = cartDetailRepository.findByCartId(cart.getId());
            cartDetailRepository.deleteAll(cartDetails);
        }
        return new ResponseObject("OK");
    }
}