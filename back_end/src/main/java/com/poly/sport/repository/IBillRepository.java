package com.poly.sport.repository;

import com.poly.sport.entity.Bill;
import com.poly.sport.infrastructure.request.FindShoeDetailRequest;
import com.poly.sport.infrastructure.request.bill.BillSearchRequest;
import com.poly.sport.infrastructure.response.BillResponse;
import com.poly.sport.infrastructure.response.SanPhamChiTietReponse;
import com.poly.sport.infrastructure.response.StatisticBillStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface IBillRepository extends JpaRepository<Bill, Long> {

    Boolean existsByCodeIgnoreCase(String code);

    @Query(value = """
            SELECT  b.id AS id,
            ROW_NUMBER() OVER(ORDER BY b.ngay_sua DESC) AS indexs,
            b.code AS code, b.ngay_tao AS createAt,
            cus.name AS customer, emp.name AS employee,
            b.ten_khach_hang AS customerName,
            b.dia_chi AS address,
            b.sdt AS phoneNumber,
            b.tong_tien AS totalMoney,
            b.tien_ship AS moneyShip,
            b.tien_giam AS moneyReduce,
            b.ngay_thanh_toan AS payDate,
            b.ngay_giao_hang AS shipDate,
            b.ngay_du_kien AS desiredDate,
            b.ngay_nhan AS receiveDate,
            b.type AS type,
            b.status AS status,
            b.ghi_chu AS note,
            v.code AS voucher
            FROM hoa_don b
            LEFT JOIN account emp ON emp.id = b.account_id
            LEFT JOIN account cus ON cus.id = b.customer_id
            LEFT JOIN voucher v ON v.id = b.voucher_id
            WHERE (:#{#req.code} IS NULL OR b.code LIKE %:#{#req.code}%
            OR b.ten_khach_hang LIKE %:#{#req.code}% OR b.sdt LIKE %:#{#req.code}%)
            AND ((:#{#req.idStaff} IS NULL OR b.account_id = :#{#req.idStaff}) OR (b.account_id IS NULL))
            AND (:#{#req.status} IS NULL OR b.status = :#{#req.status})
            AND (:#{#req.idCustomer} IS NULL OR b.customer_id = :#{#req.idCustomer})
            AND (:#{#req.fromDate} IS NULL OR :#{#req.toDate} IS NULL OR (b.ngay_sua BETWEEN :#{#req.fromDate} AND :#{#req.toDate}))
            AND b.deleted = FALSE AND b.status NOT IN (1)
            """, nativeQuery = true)
    Page<BillResponse> getAll(@Param("req") BillSearchRequest request, Pageable pageable);



    @Query("""
            SELECT b
            FROM Bill b
            WHERE (:#{#req.code} IS NULL OR b.code LIKE %:#{#req.code}%)
            AND (:#{#req.idStaff} IS NULL OR b.account.id = :#{#req.idStaff})
            AND (:#{#req.status} IS NULL OR b.status = :#{#req.status})
            AND b.deleted = FALSE 
            AND b.status = 1
            ORDER BY b.createAt DESC
            """)
    List<Bill> getNewBill(@Param("req") BillSearchRequest request);

    Bill findByCode(String code);

    Boolean existsByCode(String code);

    Page<Bill> findByAccountIdAndStatusAndDeletedFalse(Long idAccount, Integer status, Pageable pageable);



    @Query(value = """
             SELECT b.id AS id,
               ROW_NUMBER() OVER(ORDER BY b.nguoi_sua DESC) AS indexs,
               b.code AS code,
               b.ngay_tao AS createAt,
               b.ten_khach_hang AS customerName,
               b.dia_chi AS address,
               b.sdt AS phoneNumber,
               b.tong_tien AS totalMoney,
               b.tien_ship AS moneyShip,
               b.tien_giam AS moneyReduce,
               b.ngay_thanh_toan AS payDate,
               b.ngay_giao_hang AS shipDate,
               b.ngay_du_kien AS desiredDate,
               b.ngay_nhan AS receiveDate,
               b.type AS type,
               b.status AS status,
               b.ghi_chu AS note
        FROM hoa_don b
        WHERE b.status = '6'
          AND (:#{#req.fromDate} IS NULL OR :#{#req.toDate} IS NULL OR (b.nguoi_sua BETWEEN :#{#req.fromDate} AND :#{#req.toDate}))
        """, nativeQuery = true)
    Page<BillResponse> getStatisticalByDateRange(@Param("req") BillSearchRequest request, Pageable pageable);

    @Query(value = """
    SELECT
        sd.id AS id,
        ROW_NUMBER() OVER(ORDER BY s.nguoi_sua DESC) AS indexs,
        CONCAT(s.name) AS name,
        sd.code AS code,
        c.name AS color,
        sz.name AS size,
        sd.so_luong AS quantity,
        sd.can_nang AS weight,
        sd.gia AS price,
        GROUP_CONCAT(DISTINCT img.name ORDER BY img.ngay_tao ASC) AS images,
        sd.deleted AS status
    FROM chi_tiet_san_pham sd
    LEFT JOIN san_pham s ON sd.san_pham_id = s.id
    LEFT JOIN mau_sac c ON sd.mau_sac_id = c.id
    LEFT JOIN kich_co sz ON sd.kich_co_id = sz.id
    LEFT JOIN images img ON img.san_pham_id = s.id
    WHERE
        (:#{#req.shoe} IS NULL OR sd.san_pham_id IN (:#{#req.shoes}))
        AND (:#{#req.color} IS NULL OR :#{#req.color} = '' OR sd.mau_sac_id IN (:#{#req.colors}))
        AND (:#{#req.size} IS NULL OR :#{#req.size} = '' OR sd.kich_co_id IN (:#{#req.sizes}))
        AND (:#{#req.name} IS NULL OR :#{#req.name} = '' OR s.name LIKE %:#{#req.name}%)
        AND sd.so_luong < 10  -- Products with quantity less than 10
    GROUP BY
        sd.id, s.nguoi_sua, s.name, c.name, sz.name, sd.code, sd.so_luong, sd.can_nang, sd.gia, sd.deleted
""", nativeQuery = true)
    Page<SanPhamChiTietReponse> getNearExpiredProducts(@Param("req") FindShoeDetailRequest request, Pageable pageable);

    @Query(value = """
           SELECT
           CASE
               WHEN status = 2 THEN 'Chờ xác nhận'
                WHEN status = 9 THEN 'Đã xác nhận'
               WHEN status = 3 THEN 'Xác nhận thông tin thanh toán'
               WHEN status = 4 THEN 'Chờ giao hàng'
               WHEN status = 5 THEN 'Đang giao hàng'
               WHEN status = 6 THEN 'Hoàn thành'
               WHEN status = 7 THEN 'Đã hủy'
               WHEN status = 8 THEN 'Trả hàng'
               
               ELSE 'Chờ thanh toán'
           END AS statusName,
           status AS status,
           COUNT(*) AS totalCount
           FROM hoa_don b
           WHERE b.status NOT IN (1)
           GROUP BY status
           ORDER BY status
            """, nativeQuery = true)
    List<StatisticBillStatus> statisticBillStatus();
}