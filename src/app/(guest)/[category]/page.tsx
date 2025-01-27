import ListMovies2 from '@/components/listMovies2';
import { moviesServer } from '@/requestApi/movies/moviesServer';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params, searchParams }): Promise<Metadata> {
  const { category } = params;
  // const { q, t, page, limit, keyword, n } = searchParams;
  const sanitizedParams = validateSearchParams(searchParams);
  if (category === 'search' || category === 'phim-moi-cap-nhat') return null;
  const cate1 =
    category === 'phim-le'
      ? 'danh-sach/phim-le'
      : category === 'phim-bo'
      ? 'danh-sach/phim-bo'
      : category === 'quoc-gia'
      ? 'quoc-gia'
      : category === 'the-loai'
      ? 'the-loai'
      : category === 'nam-phat-hanh'
      ? 'nam-phat-hanh'
      : 'search';

  // const slug = q ? q : t ? t : n ? n : '';
  const res = await moviesServer.getMoviesByType<IModelPaginate<IMovie>>(
    cate1,
    sanitizedParams.q || sanitizedParams.t || sanitizedParams.n || '',
    sanitizedParams.page,
    sanitizedParams.limit,
    sanitizedParams.keyword
  );
  if (res.status !== 'success') {
    return;
  }
  // const cate = category === 'phim-le' ? 'Phim lẻ' : category === 'phim-bo' ? 'Phim bộ' : 'phim hot';
  return {
    title: `${res.cat.title} - Xem Phim HD Online Vietsub`,
    description: `Xem phim ${res.cat.title} Full HD online Vietsub mới nhất tuyển chọn hay nhất. Phim hay, phim mới, phim chiếu rạp tại lophim.site`,
    keywords: `${res.cat.title}, xem ${res.cat.title}, ${res.cat.title} hay `,
    robots: 'INDEX,FOLLOW',
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/${category}`,
    },
    openGraph: {
      title: `${res.cat.title} - Xem Phim HD Online VietSub`,
      description: `Danh sách phim thuộc ${res.cat.title} `,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/${category}`,
      images: res.items.map(movie => `${movie.thumb_url}`),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${res.cat.title} `,
      description: `Danh sách phim thuộc ${res.cat.title} `,
      images: res.items.map(movie => `${movie.poster_url}`),
    },
  };
}
const validateSearchParams = ({
  q,
  t,
  page,
  limit,
  keyword,
  n,
}: {
  q?: string;
  t?: string;
  page?: number;
  limit?: number;
  keyword?: string;
  n?: string;
}) => {
  return {
    q: q && isValidString(q) ? sanitizeString(q) : undefined,
    t: t && isValidString(t) ? sanitizeString(t) : undefined,
    page: isValidNumber(page) ? page : 1, // Giá trị mặc định nếu `page` không hợp lệ
    limit: isValidNumber(limit) ? limit : 10, // Giá trị mặc định nếu `limit` không hợp lệ
    keyword: keyword && isValidString(keyword) ? sanitizeString(keyword) : undefined,
    n: n && isValidString(n) ? sanitizeString(n) : undefined,
  };
};
const isValidString = (value: any): boolean => typeof value === 'string' && value.trim().length > 0;
const isValidNumber = (value: any): boolean => Number.isInteger(value) && value > 0;
const sanitizeString = (value: string): string => value.replace(/[^a-zA-Z0-9-_\s]/g, '').trim(); // Chỉ cho phép chữ cái, số, dấu gạch ngang hoặc gạch dưới.

const Category = async ({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: { q: string; t: string; page: number; limit: number; keyword: string; n: string; m: string };
}) => {
  const { category } = params;
  // const { q, t, page, limit, keyword, n } = searchParams;
  const sanitizedParams = validateSearchParams(searchParams);

  // Sử dụng sanitizedParams để gọi API

  const cate1 =
    category === 'phim-le'
      ? 'danh-sach/phim-le'
      : category === 'phim-bo'
      ? 'danh-sach/phim-bo'
      : category === 'quoc-gia'
      ? 'quoc-gia'
      : category === 'the-loai'
      ? 'the-loai'
      : category === 'nam-phat-hanh'
      ? 'nam-phat-hanh'
      : category === 'phim-moi-cap-nhat'
      ? 'phim-moi-cap-nhat'
      : 'search';

  // const slug = q ? q : t ? t : n ? n : '';
  // console.log('slug', slug);
  // console.log('cate1', cate1);
  const slug = sanitizedParams.q || sanitizedParams.t || sanitizedParams.n || '';
  const res = await moviesServer.getMoviesByType<IModelPaginate<IMovie>>(
    cate1,
    sanitizedParams.q || sanitizedParams.t || sanitizedParams.n || '',
    sanitizedParams.page,
    sanitizedParams.limit,
    sanitizedParams.keyword
  );
  if (res?.status !== 'success') {
    notFound();
  }

  if (res?.status !== 'success') return <div className=" mt-[80px] text-2xl">Không có phim</div>;
  return (
    <div className="container mx-auto px-2  pt-20">
      <div className="text-2xl font-semibold text-primary m-2">
        {category === 'search' ? `Tìm kiếm cho ${sanitizedParams.keyword}` : category === 'phim-moi-cap-nhat' ? 'Phim Mới Nhất' : res.cat.title}
      </div>
      <ListMovies2
        data={res?.items && res.items.length ? res.items : []}
        paginate={res?.paginate}
        cate1={cate1}
        slug={slug}
        keyword={sanitizedParams.keyword}
      />
    </div>
  );
};

export default Category;
