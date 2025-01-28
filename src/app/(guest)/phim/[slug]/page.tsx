// import { Carousel2 } from '@/components/carousel2';
// import DetailSeason from '@/components/detailSeason';
import { Carousel2 } from '@/components/carousel2';
import ImageCard from '@/components/imageCard';
import ListEpi from '@/components/listEpi';
import { MovieSchema } from '@/components/schemas/MovieSchema';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { moviesServer } from '@/requestApi/movies/moviesServer';
import { tmdbApiClient } from '@/requestApi/tmdb/tmdbApi';
// import { getActors } from '@/requestApi/tmdbApi';
import { Play } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';
export interface dataMovie {
  movie: IMovie;
  episodes: IEpisode[];
}
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const slug = params.slug;
  const data = await moviesServer.getMovieBySlug<IMovieResponse<IMovie>>(slug);

  if (data.status === 'success') {
    const movie = data?.movie;
    const year = new Date(movie?.created).getFullYear();
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/phim/${movie?.slug}`;
    return {
      title: `Phim ${movie.name} (${year}) - ${movie.original_name} - FullHD `,
      description: `Xem phim ${movie.name} - ${movie.description.slice(0, 155)}...`,
      robots: 'INDEX,FOLLOW',
      keywords: [`phim ${movie.name}`, movie.original_name, movie.category['2'].list.map(genre => genre.name).join(', ')],
      alternates: {
        canonical: url,
      },
      openGraph: {
        title: movie.name,
        description: movie.description,
        type: 'website',
        images: [
          {
            url: movie.thumb_url || '/placeholder.png',
            width: 500,
            height: 750,
            alt: movie.name,
          },
        ],
      },
    };
  }
  // if (!data || data.statusCode !== 200) {
  return notFound();
  // }
}
const ChiTietPhim = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  const data = await moviesServer.getMovieBySlug<IMovieResponse<IMovie>>(slug);
  // console.log('data', data);
  // if (data?.error) {
  //   return notFound();
  //
  if (data.status !== 'success') {
    return notFound();
  }
  function removeVietnameseTones(str) {
    return str
      .normalize('NFD') // Chuyển đổi chuỗi sang dạng Unicode Normalization Form D
      .replace(/[\u0300-\u036f]/g, '') // Loại bỏ các dấu thanh
      .replace(/đ/g, 'd') // Thay thế chữ "đ"
      .replace(/Đ/g, 'D') // Thay thế chữ "Đ"
      .replace(/[^a-zA-Z0-9\s]/g, '') // Loại bỏ ký tự đặc biệt
      .replace(/\s+/g, '-') // Thay thế khoảng trắng bằng dấu gạch ngang
      .toLowerCase(); // Chuyển chuỗi sang chữ thường
  }
  const movie = data?.movie;
  const year = new Date(movie?.category['3'].list[0].name).getFullYear();
  // console.log('year', year);
  const rate = await tmdbApiClient.getRate(movie?.original_name, year.toString());
  const listMovie = await moviesServer.getMoviesByType<IModelPaginate<IMovie>>('phim-moi-cap-nhat', undefined, 1, 20);
  // console.log('listMovie', listMovie);

  // console.log('movie', movie?.thumb_url?.startsWith('http') ? movie?.thumb_url : `${process.env.NEXT_PUBLIC_THUMB}${movie?.thumb_url}`);

  return (
    <>
      <MovieSchema
        title={movie?.name}
        originalTitle={movie?.original_name}
        description={movie?.description}
        posterUrl={movie?.thumb_url}
        duration={parseInt(movie?.time)}
        releaseDate={year}
        // rating={rate} // từ IMDb
        // director={movie.director || ''}
        genre={movie?.category['2'].list.map(genre => genre.name)}
        actors={movie.casts !== null && movie.casts !== '' && movie?.casts.split(', ').map(name => name.trim())}
      />
      <div>
        <div className="-z-10 relative min-h-[30vh] md:min-h-[50vh]">
          <Image
            src={movie?.poster_url || '/placeholder.png'}
            alt={movie?.name}
            width={0}
            height={0}
            sizes="100vw"
            loading="lazy"
            quality={100}
            style={{
              objectFit: 'cover',
              borderRadius: '0.5rem',
              width: '100%',
              height: 'auto',
              maxHeight: '75vh',
            }}
          />
          <div className="absolute inset-0 bg-[rgba(2,13,24,0.45)] "></div>
        </div>
        <div className="container mx-auto px-2 xl:px-32 -mt-44 sm:-mt-72  ">
          <div className="grid grid-cols-1 md:grid-cols-[minmax(200px,1fr),minmax(400px,2fr)] lg:grid-cols-[minmax(200px,1fr),minmax(600px,3fr)] xl:grid-cols-[minmax(200px,1fr),minmax(800px,3.5fr)] gap-4 lg:gap-8">
            <div className=" mx-28 sm:mx-2  ">
              <div className="relative pb-[153%]">
                <ImageCard movies={movie} />
              </div>
              {movie.episodes.length > 0 && movie.episodes[0].items.length > 0 ? (
                <Link href={'/xem-phim/' + movie?.slug}>
                  <Button className="mt-5 w-full text-lg rounded-xl lg:p-5 font-medium hover:bg-secondary hover:text-primary hover:bg-gradient-to-r hover:from-[#fc000c] hover:to-[#f9444d] ">
                    <Play /> Xem Ngay
                  </Button>
                </Link>
              ) : (
                <Button disabled className="mt-5 w-full text-lg rounded-xl lg:p-5 font-medium  ">
                  Phim Đang Xử Lý
                </Button>
              )}
            </div>

            <div className="flex  flex-col items-center justify-center md:items-start sm:mx-2  md:gap-3">
              <h2 className="text-xl md:text-3xl lg:text-5xl  font-medium">{movie?.original_name}</h2>
              <h1 className="text-xl md:text-3xl text-gray-300 ">
                {movie?.name} (
                <Link href={'/nam?n=' + year} className="text-primary">
                  {year}
                </Link>
                )
              </h1>
              {rate && (
                <div className="flex  items-center gap-2">
                  <div className="inline-flex items-center justify-center bg-[#f5c518] text-black px-[6px] py-[2px] rounded-[6px] font-bold text-[14px]">
                    IMDb
                  </div>
                  <p className="font-semibold text-xl">{rate}</p>
                </div>
              )}
              <div className="md:my-4 my-1 ">
                {movie?.category['2'].list.map(genre => (
                  <Badge
                    className="hover: cursor-pointer py-1 hover:bg-slate-500 hover:text-indigo-50 mr-3 rounded-xl border-gray-50"
                    variant="outline"
                    key={genre.id}
                  >
                    <Link href={'/the-loai?t=' + removeVietnameseTones(genre.name)}>{genre.name}</Link>
                  </Badge>
                ))}
              </div>
              <div className="font-extralight  flex gap-1  ">
                Quốc gia:{' '}
                <div className="italic">
                  {movie?.category['4'].list.map(country => (
                    <div className="hover:cursor-pointer hover:text-primary" key={country.id}>
                      <Link href={'/quoc-gia?q=' + country.name.toLowerCase().replace(/\s+/g, '-')}>{country.name}</Link>
                    </div>
                  ))}
                </div>
              </div>
              {movie.total_episodes !== 1 && (
                <span className="font-extralight  flex gap-1  ">
                  <p>Số tập:</p> <p className="italic">{movie?.total_episodes}</p>
                </span>
              )}

              <span className="font-extralight flex gap-1  ">
                <p>Thời lượng: </p>
                <p className="italic">{movie?.time} </p>
              </span>

              <Accordion type="single" collapsible className="w-full block md:hidden">
                <AccordionItem value="item-1" className="flex flex-col justify-center items-center">
                  <AccordionTrigger className="text-primary">Thông tin phim</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      Phim {movie?.name} - {movie?.description}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <p className="hidden md:block">
                Phim {movie?.name} - {movie?.description}
              </p>
              {movie && movie.casts != 'null' && (
                <div className="w-full flex  items-center">
                  <p className="font-semibold my-2">Diễn viên:</p>
                  <p>{movie?.casts === null ? 'Đang cập nhật' : movie?.casts}</p>
                </div>
              )}
            </div>
          </div>

          {movie?.total_episodes > 1 && movie.episodes.length > 0 && (
            <div className="mt-7">
              {/* <div className=" mt-5 font-semibold  lg:text-xl text-primary my-2 border-primary border w-fit p-1  rounded-xl">
                   Phim
                </div> */}
              <ListEpi movies={movie} />
            </div>
          )}
          {/* {movie?.type === 'series' && ( */}
          <div className="my-4">
            <>
              <h4 className="font-semibold text-xl lg:text-xl text-primary mt-6 mb-4">Phim mới cập nhật</h4>
              <Carousel2 data={listMovie.items} />
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChiTietPhim;
