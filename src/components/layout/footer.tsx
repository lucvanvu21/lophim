import Link from 'next/link';

const FooterC = () => {
  return (
    <footer className="my-8">
      <div className="container mx-auto px-2">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left">
            <div className="text-sm text-gray-500">
              <Link href="/" className="text-blue-500 mr-1">
                Phimtocdo
              </Link>
              - Xem phim online chất lượng cao miễn phí với phụ đề tiếng việt - thuyết minh - lồng tiếng, có nhiều thể loại phim
              phong phú, đặc sắc, nhiều bộ phim hay nhất - mới nhất. Website với giao diện trực quan, thuận tiện, tốc độ tải
              nhanh, ít quảng cáo hứa hẹn sẽ đem lại những trải nghiệm tốt cho người dùng. Tất cả nội dung của trang web này được
              thu thập từ các trang web video chính thống trên Internet, và không cung cấp phát trực tuyến chính hãng. Nếu quyền
              lợi của bạn bị vi phạm, vui lòng thông báo cho chúng tôi, chúng tôi sẽ xóa nội dung vi phạm kịp thời, cảm ơn sự hợp
              tác của bạn!
            </div>
            <p className="text-sm text-gray-500">
              © 2025{' '}
              <Link href="/" className="text-blue-500">
                Phimtocdo
              </Link>
            </p>
            <p className="text-sm text-gray-500">Made with ❤️ in Vietnam</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterC;
