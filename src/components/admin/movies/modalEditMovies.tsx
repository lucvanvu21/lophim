import { moviesRequestApi } from '@/requestApi/movies/movies';
import { tmdbApi } from '@/requestApi/tmdb';
import { tmdbApiClient } from '@/requestApi/tmdb/tmdbApiClient';
import { MoviesBodyType, MoviesBody, TmdbBody } from '@/schemasValidation/movies.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Checkbox, FormControlLabel, FormGroup, MenuItem, Modal, TextField, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  maxHeight: '90vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 8,
  overflowY: 'auto',
};
const ModelEditMovies = (props: any) => {
  const { isModelOpen, setModelOpen, id, onSubmit, movieData } = props;
  // console.log('---->movieData:', movieData);
  const {
    handleSubmit,
    register,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<MoviesBodyType>({ resolver: zodResolver(MoviesBody) });

  const {
    handleSubmit: handleGetTmdb,
    register: registerTmdb,
    reset: resetTmdb,
    formState: { errors: errorsTmdb },
  } = useForm<any>({ resolver: zodResolver(TmdbBody) });
  const [genres, setGenres] = useState<any[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: 'episodes',
  });
  const { data: session } = useSession();
  const handleClose = () => setModelOpen(false);

  const handleForm = async (movies: MoviesBodyType, token: any, id?: string) => {
    // console.log('---->movies:', movies);
    const body = {
      ...movies,
      genres: selectedGenres.map((genre: string | { _id: string }) => (typeof genre === 'string' ? genre : genre?._id)),
    };
    onSubmit(body, token, id);
  };
  useEffect(() => {
    const fetchGenres = async (token: any) => {
      try {
        const data = await moviesRequestApi.getGenres(token);
        setGenres(data.data.result);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };
    if (session?.access_token) {
      fetchGenres(session.access_token);
    }
    if (movieData && movieData.genres) {
      reset({
        ...movieData,
        genres: movieData.genres.map((genre: { _id: string }) => genre?._id),
      });
      setSelectedGenres(movieData.genres.map((genre: { _id: string }) => genre?._id));
    }
  }, [movieData, reset, session]);

  const handleGenreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const genreId = event.target.value;
    let updatedGenres;

    if (event.target.checked) {
      updatedGenres = [...selectedGenres, genreId];
    } else {
      updatedGenres = selectedGenres.filter(id => id !== genreId);
    }
    setSelectedGenres(updatedGenres);
    setValue('genres', updatedGenres);
  };

  const getDataTmdb = async (value: any) => {
    try {
      // console.log('---->value:', value);
      const data = await tmdbApiClient.getDataByTmdbId(value);
      // console.log('---->data:', data);
      if(data === 'not found'){
        return alert('not found')
      }
      toast.success(data.theloai.map((item: any) => item.name).join(', '));
      // console.log('---->data:', data);
      reset(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  // console.log('---->error:', errors);
  // console.log('---->errorTmdb:', errorsTmdb);
  return (
    <div>
      <Modal
        open={isModelOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* {movieData ? (
            ''
          ) : ( */}
            <Box
              sx={{ display: 'flex', justifyContent: 'space-around' }}
              component="form"
              onSubmit={handleGetTmdb(value => getDataTmdb(value))}
            >
              <TextField
                sx={{ minWidth: '6rem' }}
                id="filled-select-currency"
                select
                label="Type"
                defaultValue="movies"
                {...registerTmdb('type')}
                InputLabelProps={{
                  shrink: true, // Đảm bảo nhãn luôn nằm trên
                }}
              >
                <MenuItem value={'movie'}>Movies</MenuItem>
                <MenuItem value={'tv'}>Tv</MenuItem>
              </TextField>
              <TextField {...registerTmdb('tmdbId')} />
              <Button type="submit">Lấy dữ liệu</Button>
            </Box>
          {/* )} */}
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center', marginY: '20px' }}>
            {movieData ? 'Sửa Phim' : 'Thêm Phim'}
          </Typography>
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            onSubmit={handleSubmit((values: MoviesBodyType) => {
              handleForm(values, session?.access_token, id);
            })}
          >
            <TextField
              InputLabelProps={{
                shrink: true, // Đảm bảo nhãn luôn nằm trên
              }}
              sx={{ width: '100%', marginY: '10px' }}
              {...register('mediaName', { required: 'không được để trống' })}
              error={!!errors.mediaName}
              helperText={errors.mediaName?.message ? (errors.mediaName?.message as string) : ''}
              label="Name"
            />
            <TextField
              InputLabelProps={{
                shrink: true, // Đảm bảo nhãn luôn nằm trên
              }}
              sx={{ width: '100%', marginY: '10px' }}
              {...register('mediaNameVie', { required: 'không được để trống' })}
              error={!!errors.mediaNameVie}
              helperText={errors.mediaNameVie?.message ? (errors.mediaNameVie?.message as string) : ''}
              label="Name Vn"
            />
            <TextField
              InputLabelProps={{
                shrink: true, // Đảm bảo nhãn luôn nằm trên
              }}
              sx={{ width: '100%', marginY: '10px' }}
              {...register('mediaSlug', { required: 'không được để trống' })}
              error={!!errors.mediaSlug}
              helperText={errors.mediaSlug?.message ? (errors.mediaSlug?.message as string) : ''}
              label="Slug"
            />
            {/* <TextField sx={{ width: '100%', marginY: '10px' }} {...register('mediaType', { required: 'không được để trống' })} label="Type" /> */}
            <TextField
              sx={{ minWidth: 120, width: '100%' }}
              id="filled-select-currency"
              select
              label="Type"
              defaultValue="movies"
              {...register('mediaType')}
              InputLabelProps={{
                shrink: true, // Đảm bảo nhãn luôn nằm trên
              }}
            >
              <MenuItem value={'movies'}>Movies</MenuItem>
              <MenuItem value={'tv'}>Tv</MenuItem>
            </TextField>
            <TextField
              InputLabelProps={{
                shrink: true, // Đảm bảo nhãn luôn nằm trên
              }}
              sx={{ width: '100%', marginY: '10px' }}
              {...register('mediaImdbId', { required: 'không được để trống' })}
              error={!!errors.mediaImdbId}
              helperText={errors.mediaImdbId?.message ? (errors.mediaImdbId?.message as string) : ''}
              label="ImdbId"
            />
            <TextField
              InputLabelProps={{
                shrink: true, // Đảm bảo nhãn luôn nằm trên
              }}
              sx={{ width: '100%', marginY: '10px' }}
              {...register('mediaTmdbId', { required: 'không được để trống' })}
              error={!!errors.mediaTmdbId}
              helperText={errors.mediaTmdbId?.message ? (errors.mediaTmdbId?.message as string) : ''}
              label="TmdbId"
            />
            <TextField
              InputLabelProps={{
                shrink: true, // Đảm bảo nhãn luôn nằm trên
              }}
              sx={{ width: '100%', marginY: '10px' }}
              {...register('mediaDes', { required: 'không được để trống' })}
              error={!!errors.mediaDes}
              helperText={errors.mediaDes?.message ? (errors.mediaDes?.message as string) : ''}
              label="Des"
            />
            <TextField
              InputLabelProps={{
                shrink: true, // Đảm bảo nhãn luôn nằm trên
              }}
              sx={{ width: '100%', marginY: '10px' }}
              {...register('mediaPoster', { required: 'không được để trống' })}
              error={!!errors.mediaPoster}
              helperText={errors.mediaPoster?.message ? (errors.mediaPoster?.message as string) : ''}
              label="Poster"
            />
            <TextField
              InputLabelProps={{
                shrink: true, // Đảm bảo nhãn luôn nằm trên
              }}
              sx={{ width: '100%', marginY: '10px' }}
              {...register('mediaThum', { required: 'không được để trống' })}
              error={!!errors.mediaThum}
              helperText={errors.mediaThum?.message ? (errors.mediaThum?.message as string) : ''}
              label="Thum"
            />
            <TextField
              InputLabelProps={{
                shrink: true, // Đảm bảo nhãn luôn nằm trên
              }}
              sx={{ width: '100%', marginY: '10px' }}
              {...register('mediaRate', { required: 'không được để trống' })}
              error={!!errors.mediaRate}
              helperText={errors.mediaRate?.message ? (errors.mediaRate?.message as string) : ''}
              label="Rate"
            />
            <TextField
              InputLabelProps={{
                shrink: true, // Đảm bảo nhãn luôn nằm trên
              }}
              sx={{ width: '100%', marginY: '10px' }}
              {...register('totalSeasons', { required: 'không được để trống' })}
              error={!!errors.totalSeasons}
              helperText={errors.totalSeasons?.message ? (errors.totalSeasons?.message as string) : ''}
              label="Total Seasons"
            />
            <TextField
              InputLabelProps={{
                shrink: true, // Đảm bảo nhãn luôn nằm trên
              }}
              sx={{ width: '100%', marginY: '10px' }}
              {...register('mediaYear', { required: 'không được để trống' })}
              error={!!errors.mediaYear}
              helperText={errors.mediaYear?.message ? (errors.mediaYear?.message as string) : ''}
              label="Year"
            />
            <TextField
              InputLabelProps={{
                shrink: true, // Đảm bảo nhãn luôn nằm trên
              }}
              sx={{ width: '100%', marginY: '10px' }}
              {...register('country', { required: 'không được để trống' })}
              error={!!errors.country}
              helperText={errors.country?.message ? (errors.country?.message as string) : ''}
              label="Country"
            />
            <TextField
              InputLabelProps={{
                shrink: true, // Đảm bảo nhãn luôn nằm trên
              }}
              sx={{ width: '100%', marginY: '10px' }}
              {...register('totalEpisodes', { required: 'không được để trống' })}
              error={!!errors.totalEpisodes}
              helperText={errors.totalEpisodes?.message ? (errors.totalEpisodes?.message as string) : ''}
              label="Total Episodes"
            />
            <Controller
              name="isHot"
              control={control}
              render={({ field }) => (
                <FormControlLabel control={<Checkbox {...field} checked={field.value} />} label="Phim Hot" />
              )}
            />

            {movieData
              ? ''
              : fields.map((field, index) => (
                  <>
                    <Box
                      key={field.id}
                      sx={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'space-around',
                        borderTop: '1px solid #ddd',
                        paddingTop: '10px',
                      }}
                    >
                      <Box sx={{ display: 'flex', gap: '10px', flexDirection: 'column', width: '80%', marginBottom: '10px' }}>
                        <TextField
                          InputLabelProps={{
                            shrink: true, // Đảm bảo nhãn luôn nằm trên
                          }}
                          {...register(`episodes.${index}.seasons`, { required: 'không được để trống' })}
                          error={!!errors.episodes?.[index]?.seasons}
                          helperText={
                            errors.episodes?.[index]?.seasons?.message
                              ? (errors.episodes?.[index]?.seasons?.message as string)
                              : ''
                          }
                          label="Seasons"
                          sx={{ width: '100%' }}
                        />
                        <TextField
                          InputLabelProps={{
                            shrink: true, // Đảm bảo nhãn luôn nằm trên
                          }}
                          {...register(`episodes.${index}.episode`, { required: 'không được để trống' })}
                          error={!!errors.episodes?.[index]?.episode}
                          helperText={
                            errors.episodes?.[index]?.episode?.message
                              ? (errors.episodes?.[index]?.episode?.message as string)
                              : ''
                          }
                          label={`Episode ${index + 1}`}
                          sx={{ width: '100%' }}
                        />
                        <TextField
                          InputLabelProps={{
                            shrink: true, // Đảm bảo nhãn luôn nằm trên
                          }}
                          {...register(`episodes.${index}.title`, { required: 'không được để trống' })}
                          error={!!errors.episodes?.[index]?.title}
                          helperText={
                            errors.episodes?.[index]?.title?.message ? (errors.episodes?.[index]?.title?.message as string) : ''
                          }
                          label={`Title episode ${index + 1}`}
                          sx={{ width: '100%' }}
                          hidden={true}
                        />
                        <TextField
                          InputLabelProps={{
                            shrink: true, // Đảm bảo nhãn luôn nằm trên
                          }}
                          {...register(`episodes.${index}.subtitle`, { required: 'không được để trống' })}
                          error={!!errors.episodes?.[index]?.url}
                          helperText={
                            errors.episodes?.[index]?.url?.message ? (errors.episodes?.[index]?.url?.message as string) : ''
                          }
                          label="subtitle"
                          sx={{ width: '100%' }}
                        />
                        <TextField
                          InputLabelProps={{
                            shrink: true, // Đảm bảo nhãn luôn nằm trên
                          }}
                          {...register(`episodes.${index}.url`, { required: 'không được để trống' })}
                          error={!!errors.episodes?.[index]?.url}
                          helperText={
                            errors.episodes?.[index]?.url?.message ? (errors.episodes?.[index]?.url?.message as string) : ''
                          }
                          label="URL"
                          sx={{ width: '100%' }}
                        />
                      </Box>
                      <Button onClick={() => remove(index)}>Xóa</Button>
                    </Box>
                    {/* <Button onClick={() => append({ title: '', episode: index + 1, seasons: 1, url: '' })}>Thêm tập</Button> */}
                  </>
                ))}
            {movieData ? (
              ''
            ) : (
              <Button onClick={() => append({ title: '', episode: '', seasons: '', url: '' } as any)}>Thêm tập</Button>
            )}
            <Typography variant="h5">Genres</Typography>
            <Box>
              <FormGroup
                sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px', justifyContent: 'space-around' }}
              >
                {genres?.map(genre => (
                  <FormControlLabel
                    key={genre._id}
                    control={
                      <Checkbox value={genre._id} onChange={handleGenreChange} checked={selectedGenres.includes(genre?._id)} />
                    }
                    label={genre.name}
                  />
                ))}
              </FormGroup>
            </Box>
            <Button
              variant="outlined"
              type="submit"
              sx={{
                marginTop: '20px',
                width: '50%',
              }}
            >
              {movieData ? 'Cập nhật' : 'Tạo mới'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ModelEditMovies;
