import { Container, Divider, Typography } from '@mui/material';
import React from 'react';

const FooterLayout = () => {
  return (
    <>
      <Container maxWidth="xl" sx={{ my: 3 }}>
        <Divider />
        <Typography sx={{ mt: 3 }} color="#b5b5b5" lineHeight={2}>
          lophim.site - Xem phim online chất lượng cao miễn phí với phụ đề tiếng việt - thuyết minh - lồng tiếng, có nhiều thể loại
          phim phong phú, đặc sắc, nhiều bộ phim hay nhất - mới nhất. Website với giao diện trực quan, thuận tiện, tốc độ tải
          nhanh, không quảng cáo hứa hẹn sẽ đem lại những trải nghiệm tốt cho người dùng.
        </Typography>
        {/* <Typography color="#b5b5b5" lineHeight={2}>
          Lượng dữ liệu trên giây (bitrate) gấp từ 5 - 10 lần phim online thông thường - đây là yếu tố quyết định độ nét của phim
          (thậm chí còn quan trọng hơn độ phân giải)
        </Typography> */}
        {/* <Typography color="#b5b5b5" lineHeight={2}>
          Xem phim online miễn phí chất lượng siêu nét với phụ đề tiếng Việt - thuyết minh - lồng tiếng tại lophim. Thư viện
          phim đa dạng, đặc sắc, cập nhật liên tục với những bộ phim hay nhất - mới nhất. Truy cập lophim.site ngay để trải
          nghiệm giao diện trực quan, tiện lợi và tốc độ tải nhanh, mang đến những trải nghiệm tuyệt vời cho người dùng.
        </Typography> */}
        {/* <Typography color="#b5b5b5" lineHeight={2}>
          Âm thanh 5.1 (6 channel) thay vì stereo (2 channel) như các trang phim khác (kể cả Youtube) Phù hợp để xem trên màn hình
          TV, máy tính, laptop có độ phân giải cao
        </Typography> */}
      </Container>
    </>
  );
};

export default FooterLayout;
