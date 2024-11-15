'use client';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import { IMoviesPaginate } from '@/types';
import { Box, Button, Pagination, Stack, Tooltip, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { green, red } from '@mui/material/colors';
import LoupeIcon from '@mui/icons-material/Loupe';
import { useState } from 'react';
import ModelDialog from '../../dialog';
import { toast } from 'react-toastify';
import { moviesRequestApi } from '@/requestApi/movies/movies';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ModelEditMovies from './modalEditMovies';
import { useSession } from 'next-auth/react';
import ModalEpisodes from './modalEpisodes';
import Image from 'next/image';

interface Column {
  id:
    | 'stt'
    | 'action'
    | 'name'
    | 'vieName'
    | 'slug'
    | 'type'
    | 'tmdb'
    | 'imdb'
    | 'description'
    | 'poster'
    | 'backdrop'
    | 'rate'
    | 'year'
    | 'genre'
    | 'date'
    | 'country'
    | 'totalEpisodes';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'stt', label: 'stt', minWidth: 20 },
  {
    id: 'action',
    label: 'action',
    minWidth: 250,
  },
  { id: 'name', label: 'Name', minWidth: 150 },

  { id: 'vieName', label: 'vieName', minWidth: 150 },
  {
    id: 'poster',
    label: 'poster',
    minWidth: 80,
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'slug',
    label: 'slug',
    minWidth: 170,
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'type',
    label: 'type',
    minWidth: 50,
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'tmdb',
    label: 'tmdb',
    minWidth: 50,
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'imdb',
    label: 'imdb',
    minWidth: 50,
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'description',
    label: 'description',
    minWidth: 230,
    format: (value: number) => value.toFixed(2),
  },

  {
    id: 'backdrop',
    label: 'backdrop',
    minWidth: 120,
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'totalEpisodes',
    label: 'total episodes',
    minWidth: 60,
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'genre',
    label: 'genre',
    minWidth: 120,
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'rate',
    label: 'rate',
    minWidth: 50,
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'year',
    label: 'year',
    minWidth: 80,
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'country',
    label: 'country',
    minWidth: 80,
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'date',
    label: 'date',
    minWidth: 120,
    format: (value: number) => value.toFixed(2),
  },
];

export default function TableMoviesAdmin({ data, limit }: { data: IBackendRes<IMoviesPaginate>; limit: number }) {
  // console.log('---->data:', data);

  // console.log('---->data:', data);
  const { data: session } = useSession();
  const router = useRouter();
  // console.log('---->limit:', limit);
  const result = data?.data?.result;
  const meta = data?.data?.meta ? data?.data?.meta : { currentPage: 1, totalPages: 1, total: 1, pageSize: 1 };
  const { currentPage } = meta;
  const [page, setPage] = useState(currentPage);
  const [open, setOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEditModel, setOpenEditModel] = useState(false);
  const [openEpisodes, setOpenEpisodes] = useState(false);
  const [openEpisodesEdit, setOpenEpisodesEdit] = useState(false);
  const [selectedMoviesId, setSelectedMoviesId] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
    router.push(`?page=${page}`);
  };

  const handleDelete = async (id: string) => {
    setSelectedMoviesId(id);
    setOpen(true);
  };
  const handleSubmit = async (id: string, token: any) => {
    const res = await moviesRequestApi.deleteMovies(id, token);
    if (res.error) {
      toast.error(res.message);
    } else {
      toast.success('Xóa thành công');
      setOpen(false);
    }
  };
  const handleAddMovies = async (data: any, token: any, id?: string) => {
    // console.log('---->dataAdd:', data);
    const res = await moviesRequestApi.addMovies(data, token);
    // console.log('---->res:', res);
    if (res.error) {
      toast.error(res.message);
    } else {
      toast.success('Thêm thành công');
      setOpenCreate(false);
    }
  };
  const handleSubmitUpdateMovies = async (data: any, token: any, id: string) => {
    // console.log('---->dataEdit:', data);
    const res = await moviesRequestApi.updateMovies(data, token, id);
    // console.log('---->res:', res);
    if (res.data.modifiedCount > 0) {
      toast.success('Cập nhật thành công');
      setOpenEditModel(false);
    } else {
      toast.error('Cập nhật thất bại');
    }
  };
  const openEdit = async (movie: any, session: any) => {
    const resEpisodes = await moviesRequestApi.getEpisodes(movie._id, session);
    // console.log('---->resEpisodes---------:', movie);
    setSelectedMovie({ ...movie, episodes: resEpisodes.data });
    setSelectedMoviesId(movie._id);
  };

  // console.log('---->selectedMovie:', selectedMovie);
  return (
    <>
      <Box sx={{ display: 'flex', gap: 4 }}>
        <Button color="error" variant="contained" onClick={() => setOpenCreate(true)}>
          Create Movies
        </Button>
      </Box>
      <Paper sx={{ width: { lg: '80vw', sm: '80vw', xs: '70vw' }, overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: '74vh', minHeight: '70vh' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {result?.map((movie, index) => {
                const formattedDate = new Date(movie.createdAt).toLocaleDateString('vi-VN', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                });
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={movie._id}>
                    <TableCell key={movie._id} align="left">
                      {(page - 1) * limit + index + 1}
                    </TableCell>
                    <TableCell key={movie._id}>
                      <Tooltip title="Sửa tập phim">
                        <Button
                          onClick={() => {
                            setOpenEpisodesEdit(true);

                            openEdit(movie, session?.access_token);
                          }}
                        >
                          <AppRegistrationIcon sx={{ color: 'white', ':hover': { color: green[800] } }} />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Thêm tập phim">
                        <Button
                          onClick={() => {
                            setOpenEpisodes(true);

                            openEdit(movie, session?.access_token);
                          }}
                        >
                          <LoupeIcon sx={{ color: 'white', ':hover': { color: green[800] } }} />
                        </Button>
                      </Tooltip>

                      <Tooltip title="Sửa phim">
                        <Button
                          onClick={() => {
                            setOpenEditModel(true);
                            // console.log('---->movie------------>:', movie);

                            openEdit(movie, session?.access_token);
                          }}
                        >
                          <EditNoteIcon sx={{ color: 'white', ':hover': { color: green[800] } }} />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Xóa phim">
                        <Button
                          onClick={() => {
                            handleDelete(movie._id);
                          }}
                          sx={{ ':hover': { backgroundColor: 'transparent' } }}
                        >
                          <DeleteIcon sx={{ color: 'white', ':hover': { color: red[500] } }}></DeleteIcon>
                        </Button>
                      </Tooltip>
                    </TableCell>
                    <TableCell key={movie._id} align="left">
                      {movie.mediaName}
                    </TableCell>

                    <TableCell key={movie._id} align="left">
                      {movie.mediaNameVie}
                    </TableCell>
                    <TableCell key={movie._id} align="left">
                      <Image
                      // unoptimized
                        style={{
                          width: '100%', // Chiều rộng 100% của ô
                          height: 'auto', // Chiều cao tự động
                          maxHeight: 'auto', // Giới hạn chiều cao tối đa
                          objectFit: 'cover', // Cắt hình ảnh nếu nó quá lớn
                        }}
                        width={60}
                        height={80}
                        // srcSet={`${movie.mediaPoster}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        src={`${process.env.NEXT_PUBLIC_IMAGE}${movie.mediaPoster}`}
                        alt={movie.mediaName}
                        loading="lazy"
                      />
                      {/* {movie.mediaPoster} */}
                    </TableCell>
                    <TableCell key={movie._id} align="left">
                      {movie.mediaSlug}
                    </TableCell>
                    <TableCell key={movie._id} align="left">
                      {movie.mediaType}
                    </TableCell>
                    <TableCell key={movie._id} align="left">
                      {movie.mediaTmdbId}
                    </TableCell>
                    <TableCell key={movie._id} align="left">
                      {movie.mediaImdbId}
                    </TableCell>
                    <TableCell key={movie._id} align="left" height={50}>
                      <Typography
                        sx={{
                          display: '-webkit-box', // Định dạng hiển thị cho kiểu cắt nhiều dòng
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 3, // Giới hạn 2 dòng
                          overflow: 'hidden', // Đảm bảo nội dung bị cắt thay vì tràn
                          textOverflow: 'ellipsis',
                          maxWidth: 200,
                        }}
                      >
                        {movie.mediaDes}
                      </Typography>
                    </TableCell>

                    <TableCell key={movie._id} align="left">
                      <Image
                      // unoptimized
                        style={{
                          width: '100%', // Chiều rộng 100% của ô
                          height: 'auto', // Chiều cao tự động
                          maxHeight: 'auto', // Giới hạn chiều cao tối đa
                          objectFit: 'cover', // Cắt hình ảnh nếu nó quá lớn
                        }}
                        width={100}
                        height={100}
                        // srcSet={`${movie.mediaPoster}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        src={`${process.env.NEXT_PUBLIC_IMAGE}${movie.mediaThum}`}
                        alt={movie.mediaName}
                        loading="lazy"
                      />
                    </TableCell>
                    <TableCell key={movie._id} align="left">
                      {movie.totalEpisodes}
                    </TableCell>
                    <TableCell key={movie._id} align="left">
                      {movie.genres?.map(genre => genre.slug).join(', ')}
                    </TableCell>
                    <TableCell key={movie._id} align="left">
                      {movie.mediaRate}
                    </TableCell>
                    <TableCell key={movie._id} align="left">
                      {movie.mediaYear}
                    </TableCell>
                    <TableCell key={movie._id} align="left">
                      {movie.country}
                    </TableCell>
                    <TableCell key={movie._id} align="left">
                      {formattedDate}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack sx={{ margin: '0.8rem' }} spacing={2}>
          <Pagination count={meta?.totalPages} page={currentPage} onChange={handleChange} color="primary" />
        </Stack>
        {open && selectedMoviesId && (
          <ModelDialog isModelOpen={open} setModelOpen={setOpen} id={selectedMoviesId} onSubmit={handleSubmit} />
        )}
        {openEditModel && selectedMoviesId && (
          <ModelEditMovies
            isModelOpen={openEditModel}
            setModelOpen={setOpenEditModel}
            id={selectedMoviesId}
            movieData={selectedMovie}
            onSubmit={handleSubmitUpdateMovies}
          />
        )}

        {openCreate && (
          <ModelEditMovies
            isModelOpen={openCreate}
            setModelOpen={setOpenCreate}
            // id={selectedMoviesId}
            onSubmit={handleAddMovies}
          />
        )}
        {openEpisodes && <ModalEpisodes isModelOpen={openEpisodes} setModelOpen={setOpenEpisodes} episodesData={selectedMovie} />}
        {openEpisodesEdit && (
          <ModalEpisodes
            isModelOpen={openEpisodesEdit}
            setModelOpen={setOpenEpisodesEdit}
            episodesData={selectedMovie}
            isEditEpisode={selectedMoviesId}
          />
        )}
      </Paper>
    </>
  );
}
