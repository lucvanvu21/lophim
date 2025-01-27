import { Carousel2 } from '@/components/carousel2';
import FooterC from '@/components/layout/footer';
import Header from '@/components/layout/header';
import ListMovies from '@/components/listMovies';
import { HomeSchema } from '@/components/schemas/HomeSchema';
import { MovieListSchema } from '@/components/schemas/MovieListSchema';
import { moviesServer } from '@/requestApi/movies/moviesServer';
import { ChevronRight } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
export const metadata: Metadata = {
  robots: 'INDEX,FOLLOW',
};
export default async function Home() {
  const newMovies = await moviesServer.getMoviesByType<IModelPaginate<IMovie>>('phim-moi-cap-nhat', undefined, 1, 20);
  const dangChieu = await moviesServer.getMoviesByType<IModelPaginate<IMovie>>('danh-sach', 'phim-dang-chieu', 1, 12);

  // console.log('newMovies', newMovies);
  // console.log('dangChieu', dangChieu);
  const movies1 = await moviesServer.getMoviesByType<IModelPaginate<IMovie>>('danh-sach', 'phim-le', 1, 20);
  const movies2 = await moviesServer.getMoviesByType<IModelPaginate<IMovie>>('danh-sach', 'phim-le', 2, 2);
  const movies = { ...movies1, items: [...movies1.items, ...movies2.items].slice(0, 12) };

  const series1 = await moviesServer.getMoviesByType<IModelPaginate<IMovie>>('danh-sach', 'phim-bo', 1, 20);
  const series2 = await moviesServer.getMoviesByType<IModelPaginate<IMovie>>('danh-sach', 'phim-bo', 2, 2);
  const series = { ...series1, items: [...series1.items, ...series2.items].slice(0, 12) };

  // const hq2 = await moviesServer.getMoviesByType<IModelPaginate<IMovie>>('quoc-gia', 'han-quoc', 2, 12);
  const hq = await moviesServer.getMoviesByType<IModelPaginate<IMovie>>('quoc-gia', 'han-quoc', 1, 12);
  // const hq = { ...hq1, items: [...hq1.items, ...hq2.items] }
  // const hq = await getMoviesByCategory<IModelPaginate<IMovies>>('quoc-gia', 1, 12, 'han-quoc');
  const tq = await moviesServer.getMoviesByType<IModelPaginate<IMovie>>('quoc-gia', 'trung-quoc', 1, 12);
  const hoatHinh = await moviesServer.getMoviesByType<IModelPaginate<IMovie>>('the-loai', 'hoat-hinh', 1, 12);
  // console.log('page 1', hq);
  if (
    newMovies?.status !== 'success' ||
    dangChieu?.status !== 'success' ||
    movies?.status !== 'success' ||
    series?.status !== 'success' ||
    hq?.status !== 'success' ||
    tq?.status !== 'success'
  ) {
    console.error('API trả về dữ liệu không hợp lệ:', { newMovies, dangChieu, movies, series, hq, tq });
    return (
      <div>
        <h1>Đã xảy ra vấn đề vui lòng quay lại sau!</h1>
      </div>
    );
  }
  // console.log(hq);
  // if (!hot || !chieurap || !movies || !series || !hq || !tq) {
  //   return null;
  // }
  // console.log(hq);

  return (
    <>
      <HomeSchema />
      {hq?.items && hq?.items?.length > 0 && (
        <MovieListSchema
          title="Phim Hàn Quốc mới"
          movies={
            hq?.items?.map(movie => ({
              name: movie.name,
              url: `/phim/${movie.slug}`,
              image: movie?.thumb_url || '/placeholder.jpg',
            })) || []
          }
        />
      )}
      {tq?.items && tq?.items.length > 0 && (
        <MovieListSchema
          title="Phim Trung Quốc mới"
          movies={
            tq?.items?.map(movie => ({
              name: movie.name,
              url: `/phim/${movie.slug}`,
              image: movie.thumb_url,
            })) || []
          }
        />
      )}
      {movies?.items && movies?.items.length > 0 && (
        <MovieListSchema
          title="Phim lẻ mới hôm nay"
          movies={
            movies?.items?.map(movie => ({
              name: movie.name,
              url: `/phim/${movie.slug}`,
              image: movie.thumb_url,
            })) || []
          }
        />
      )}

      {series?.items && series?.items.length > 0 && (
        <MovieListSchema
          title="Phim bộ mới hôm nay"
          movies={
            series?.items?.map(movie => ({
              name: movie.name,
              url: `/phim/${movie.slug}`,
              image: movie.thumb_url,
            })) || []
          }
        />
      )}
      <Header />
      <div>
        <div className="container mx-auto px-2 mt-[75px]">
          <section aria-label="Phim Hàn Quốc">
            <div className="w-full my-5 lg:my-10">
              <div className="lg:flex items-center justify-center my-2">
                <div className="lg:max-w-[14%] lg:min-w-[14%] flex justify-between items-center lg:block">
                  <h2 className="text-xl lg:text-3xl font-semibold my-4 text-primary">Phim Hàn Quốc mới</h2>
                  <Link href="/quoc-gia?q=han-quoc">
                    <div className="flex items-center group relative overflow-hidden cursor-pointer">
                      <p className="group-hover:text-primary">Xem toàn bộ</p>
                      <ChevronRight
                        className=" group-hover:text-primary" // Thay đổi ở đây
                        size={20}
                      />
                    </div>
                  </Link>
                </div>
                <Carousel2 data={hq?.items} />
              </div>
            </div>
          </section>

          <section aria-label="Phim Trung Quốc">
            <div className="w-full my-5 lg:my-10">
              <div className="lg:flex items-center justify-center my-2">
                <div className="lg:max-w-[14%] lg:min-w-[14%] flex justify-between items-center lg:block">
                  <h2 className="text-xl lg:text-3xl font-semibold my-4 text-primary">Phim Trung Quốc mới</h2>
                  <Link href="/quoc-gia?q=trung-quoc">
                    <div className="flex items-center group relative overflow-hidden cursor-pointer">
                      <p className="group-hover:text-primary">Xem toàn bộ</p>
                      <ChevronRight
                        className=" group-hover:text-primary" // Thay đổi ở đây
                        size={20}
                      />
                    </div>
                  </Link>
                </div>
                <Carousel2 data={tq?.items} />
              </div>
            </div>
          </section>

          <section aria-label="Phim Hoạt Hình">
            <div className="w-full my-5 lg:my-10">
              <div className="lg:flex items-center justify-center my-2">
                <div className="lg:max-w-[14%] lg:min-w-[14%] flex justify-between items-center lg:block">
                  <h2 className="text-xl lg:text-3xl font-semibold my-4 text-primary">Phim Hoạt Hình</h2>
                  <Link href="/the-loai?t=hoat-hinh">
                    <div className="flex items-center group relative overflow-hidden cursor-pointer">
                      <p className="group-hover:text-primary">Xem toàn bộ</p>
                      <ChevronRight
                        className=" group-hover:text-primary" // Thay đổi ở đây
                        size={20}
                      />
                    </div>
                  </Link>
                </div>
                <Carousel2 data={hoatHinh?.items} />
              </div>
            </div>
          </section>
          <section aria-label="Phim Mới Cập Nhật">
            <div className="w-full my-5 lg:my-10">
              <div className="lg:flex items-center justify-center my-2">
                <div className="lg:max-w-[14%] lg:min-w-[14%] flex justify-between items-center lg:block">
                  <h2 className="text-xl lg:text-3xl font-semibold my-4 text-primary">Phim Mới Cập Nhật</h2>
                  <Link href="/phim-moi-cap-nhat">
                    <div className="flex items-center group relative overflow-hidden cursor-pointer">
                      <p className="group-hover:text-primary">Xem toàn bộ</p>
                      <ChevronRight
                        className=" group-hover:text-primary" // Thay đổi ở đây
                        size={20}
                      />
                    </div>
                  </Link>
                </div>
                <Carousel2 data={newMovies?.items} />
              </div>
            </div>
          </section>
          <section aria-label="Phim Đang Chiếu">
            <div className="w-full my-5 lg:my-10">
              <div className="lg:flex items-center justify-center my-2">
                <div className="lg:max-w-[14%] lg:min-w-[14%] flex justify-between items-center lg:block">
                  <h2 className="text-xl lg:text-3xl font-semibold my-4 text-primary">Phim Đang Chiếu</h2>
                  <Link href="#">
                    <div className="flex items-center group relative overflow-hidden cursor-pointer">
                      <p className="group-hover:text-primary">Xem toàn bộ</p>
                      <ChevronRight
                        className=" group-hover:text-primary" // Thay đổi ở đây
                        size={20}
                      />
                    </div>
                  </Link>
                </div>
                <Carousel2 data={dangChieu?.items} />
              </div>
            </div>
          </section>
          <section aria-label="Phim Lẻ">
            <div className="w-full">
              <div className=" py-4">
                <div className="flex items-center">
                  <h2 className="text-xl lg:text-3xl font-semibold my-4 text-primary">Phim lẻ mới hôm nay</h2>
                  <Link href="/phim-le">
                    <div className="flex items-center group relative overflow-hidden ml-4 cursor-pointer pr-24">
                      <h3 className="text-sm absolute left-0 opacity-0 -translate-x-full group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap group-hover:text-primary">
                        Xem thêm
                      </h3>
                      <ChevronRight
                        className="transition-transform duration-300 group-hover:translate-x-[calc(100%+3rem)] group-hover:text-primary" // Thay đổi ở đây
                        size={20}
                      />
                    </div>
                  </Link>
                </div>
              </div>
              <ListMovies data={movies?.items} />
            </div>
          </section>
          <section aria-label="Phim Bộ">
            <div className="w-full">
              <div className=" py-4">
                <div className="flex items-center">
                  <h2 className="text-xl lg:text-3xl font-semibold my-4 text-primary">Phim bộ mới hôm nay</h2>
                  <Link href="/phim-bo">
                    <div className="flex items-center group relative overflow-hidden ml-4 cursor-pointer pr-24">
                      <h3 className="text-sm absolute left-0 opacity-0 -translate-x-full group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap group-hover:text-primary">
                        Xem thêm
                      </h3>
                      <ChevronRight
                        className="transition-transform duration-300 group-hover:translate-x-[calc(100%+3rem)] group-hover:text-primary" // Thay đổi ở đây
                        size={20}
                      />
                    </div>
                  </Link>
                </div>
              </div>
              <ListMovies data={series?.items} />
            </div>
          </section>
        </div>
      </div>
      <FooterC />
    </>
  );
}
