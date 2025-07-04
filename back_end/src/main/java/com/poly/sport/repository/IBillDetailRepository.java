package com.poly.sport.repository;

import com.poly.sport.entity.Bill;
import com.poly.sport.entity.BillDetail;
import com.poly.sport.entity.SanPhamChiTiet;
import com.poly.sport.infrastructure.request.BillDetailRequest;
import com.poly.sport.infrastructure.response.BillDetailResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface IBillDetailRepository extends JpaRepository<BillDetail, Long> {
    @Query("SELECT detail FROM BillDetail detail " +
            "WHERE detail.bill.id = :id ")
    BillDetail findBillDetail(@Param("id") Long id);

    List<BillDetail> findByBillId(Long id);

    BillDetail findByShoeDetailCodeAndBillId(String codeShoeDetail, Long idBill);

    Boolean existsByShoeDetailIdAndBillId(Long idShoeDetail, Long idBill);

    @Query(value = """
        SELECT
            ROW_NUMBER() OVER(ORDER BY s.nguoi_sua DESC) AS indexs,
            bd.id AS id,
            CONCAT(s.name) AS name,
            sd.code AS shoeCode,
            c.name AS color,
            sz.name AS size,
            bd.so_luong AS quantity,
            bd.gia AS price,
            sd.gia AS shoePrice,
            bd.gia_tri_giam AS discountValue,
            bd.phan_tram_giam AS discountPercent,
            GROUP_CONCAT(DISTINCT img.name ORDER BY img.ngay_tao ASC) AS images
        FROM hoa_don_chi_tiet bd
        JOIN chi_tiet_san_pham sd ON sd.id = bd.chi_tiet_san_pham_id
        JOIN san_pham s ON s.id = sd.san_pham_id
        JOIN mau_sac c ON sd.mau_sac_id = c.id
        JOIN kich_co sz ON sd.kich_co_id = sz.id
        LEFT JOIN images img ON img.san_pham_id = s.id
        WHERE
            bd.hoa_don_id = :#{#req.bill}
        GROUP BY
            bd.id, s.nguoi_sua, s.name, c.name, sz.name, sd.code,
            bd.so_luong, bd.gia, bd.gia_tri_giam, bd.phan_tram_giam
    """, nativeQuery = true)
    Page<BillDetailResponse> getAllBillDetail(@Param("req") BillDetailRequest request, Pageable pageable);

    @Query("SELECT bd FROM BillDetail bd WHERE bd.bill = :bill AND bd.shoeDetail = :shoeDetail AND " +
            "((:discountPercent IS NULL AND bd.discountPercent IS NULL) OR bd.discountPercent = :discountPercent)")
    BillDetail findByBillAndShoeDetailAndDiscountPercent(@Param("bill") Bill bill,
                                                         @Param("shoeDetail") SanPhamChiTiet shoeDetail,
                                                         @Param("discountPercent") Float discountPercent);

    @Query("SELECT bd.discountPercent FROM BillDetail bd " +
            "WHERE bd.shoeDetail.code = :shoeDetailCode AND bd.bill.id = :billId " +
            "ORDER BY bd.id DESC LIMIT 1")
    Float findLatestDiscountPercentByShoeDetailCodeAndBillId(
            @Param("shoeDetailCode") String shoeDetailCode,
            @Param("billId") Long billId);

    @Query(value = """
    SELECT
        ROW_NUMBER() OVER(ORDER BY s.nguoi_sua DESC) AS indexs,
        bd.id AS id,
        CONCAT(s.name) AS name,
        sd.code AS shoeCode,
        c.name AS color,
        sz.name AS size,
        bd.so_luong AS quantity,
        bd.gia AS price,
        sd.gia AS shoePrice,
        CASE
            WHEN CURRENT_TIMESTAMP BETWEEN pm.start_date AND pm.end_date
                THEN pmd.gia_khuyen_mai
            ELSE NULL
        END AS discountValue,
        CASE
            WHEN CURRENT_TIMESTAMP BETWEEN pm.start_date AND pm.end_date
                THEN MAX(pm.gia_tri)
            ELSE NULL
        END AS discountPercent,
        GROUP_CONCAT(DISTINCT img.name ORDER BY img.ngay_tao ASC) AS images
    FROM hoa_don_chi_tiet bd
    JOIN chi_tiet_san_pham sd ON sd.id = bd.chi_tiet_san_pham_id
    JOIN san_pham s ON s.id = sd.san_pham_id
    JOIN mau_sac c ON sd.mau_sac_id = c.id
    JOIN kich_co sz ON sd.kich_co_id = sz.id
    LEFT JOIN images img ON img.san_pham_id = s.id
    LEFT JOIN khuyen_mai_chi_tiet pmd ON pmd.chi_tiet_san_pham_id = sd.id
    LEFT JOIN khuyen_mai pm ON pm.id = pmd.khuyen_mai_id
    WHERE
        bd.hoa_don_id = :#{#req.bill}
    GROUP BY
        bd.id, s.nguoi_sua, s.name, c.name, sz.name, sd.code,
        bd.so_luong, bd.gia, pm.start_date, pm.end_date, pmd.gia_khuyen_mai
""", nativeQuery = true)
    Page<BillDetailResponse> getAllBillDetailTaiQuay(@Param("req") BillDetailRequest request, Pageable pageable);


    @Query("SELECT bd FROM BillDetail bd WHERE bd.bill = :bill AND bd.shoeDetail = :shoeDetail AND " +
            "((:discountPercent IS NULL AND bd.discountPercent IS NULL) OR bd.discountPercent = :discountPercent) AND " +
            "bd.price = :price")
    BillDetail findByBillAndShoeDetailAndDiscountPercentAndPrice(
            @Param("bill") Bill bill,
            @Param("shoeDetail") SanPhamChiTiet shoeDetail,
            @Param("discountPercent") Float discountPercent,
            @Param("price") BigDecimal price);
}