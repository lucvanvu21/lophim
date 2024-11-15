import { getNguonC } from '@/requestApi/episodeApi';
import { moviesRequestApi } from '@/requestApi/movies/movies';
import { Episode } from '@/schemasValidation/movies.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, MenuItem, Modal, TextField, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
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

const ModalEpisodes = (props: any) => {
  const { data: session } = useSession();
  const { isModelOpen, setModelOpen, episodesData, isEditEpisode } = props;

  const {
    handleSubmit,
    register,
    reset,
    control,
    getValues,
    formState: { errors },
  } = useForm();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: 'episodes',
  });

  useEffect(() => {
    reset({ episodes: episodesData?.episodes });
    // console.log('---->episodesData:', episodesData);
    resetSlug({ slug: episodesData?.mediaSlug, apisrc: 'nguonc' });
  }, [episodesData]);

  const handleForm = async (data: any, token: any) => {
    // console.log('---->dataIn Form:', data);
    if (!isEditEpisode) {
      const newEpisodes = data.episodes.filter((episode: any) => !episode._id);
      const movieId = episodesData._id;
      const res = await moviesRequestApi.addEpisodes(newEpisodes, token, movieId);
      if (res.statusCode === 201) {
        setModelOpen(false);

        if (res.data.success) {
          const successMessages = res.data.success.map((s: any) => `Tập ${s.episode}: Seasons ${s.seasons}`).join(', ');
          toast.success(`Thêm thành công: ${successMessages}`);
        }
        if (res.data.error) {
          const errorMessages = res.data.error.map((e: any) => `Seasons ${e.seasons}-Tập ${e.episode}: ${e.message}`).join(', ');
          toast.error(`Thêm thất bại: ${errorMessages}`);
        }
        if (res.data.success === null && res.data.error === null) {
          toast.error('Thêm thất bại');
        }
      } else {
        toast.error('Có lỗi xảy ra');
      }
    } else {
      const updateEpisodes = await moviesRequestApi.updateEpisodes(data.episodes, isEditEpisode, token);
      if (updateEpisodes.statusCode === 200) {
        setModelOpen(false);
        toast.success(`Cập nhật thành công`);
      } else {
        toast.error('Có lỗi xảy ra');
      }
    }
  };
  // console.log('---->error:', errors);
  const handleRemove = async (index: number, movieId?: any, token?: any) => {
    if (movieId) {
      const deleteEpi = await moviesRequestApi.deleteEpisode(movieId, token);
      // console.log('---->delete:', deleteEpi);
      if (deleteEpi.statusCode === 200) {
        remove(index);
        toast.success(`Xóa thành công`);
      }
    } else {
      remove(index);
    }
  };
  const {
    handleSubmit: handleGetEpisodes,
    register: registerSlug,
    reset: resetSlug,
    formState: { errors: errorsSlug },
  } = useForm<any>({ resolver: zodResolver(Episode) });
  const getEpisodesApi = async (data: any) => {
    if (data.apisrc === 'nguonc') {
      const values = getValues('episodes');

      const existingSeasonEpisodes = values.filter(item => item.seasons == data.seasons);

      // Nếu không có tập nào cho mùa này, chúng ta có thể thêm tất cả các tập từ API
      if (existingSeasonEpisodes.length === 0) {
        const res = await getNguonC(data.slug, data.seasons);
        if (res.length > 0) {
          reset({ episodes: [...values, ...res] });

          return;
        }
        toast.error('Không tìm thấy dữ liệu');
        return;
      }
      const res = await getNguonC(data.slug, data.seasons);
      if (res.length > 0) {
        const newData = [...values, ...res.slice(values.length)];

        reset({ episodes: newData });
        return;
      }
      toast.error('Không tìm thấy dữ liệu');
      return;
    }
  };
  return (
    <>
      <Modal
        open={isModelOpen}
        onClose={() => setModelOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{ display: 'flex', justifyContent: 'space-around' }}
            component="form"
            onSubmit={handleGetEpisodes(value => getEpisodesApi(value))}
          >
            <TextField
              sx={{ minWidth: '6rem' }}
              id="filled-select-currency"
              select
              label="Api"
              defaultValue="nguonc"
              {...registerSlug('apisrc')}
              InputLabelProps={{
                shrink: true, // Đảm bảo nhãn luôn nằm trên
              }}
            >
              <MenuItem value={'nguonc'}>Nguonc</MenuItem>
              <MenuItem value={'kkphim'}>Kkphim</MenuItem>
              <MenuItem value={'ophim'}>Ophim</MenuItem>
            </TextField>
            <TextField {...registerSlug('slug')} />
            <TextField {...registerSlug('seasons')} />
            <Button type="submit">Lấy dữ liệu</Button>
          </Box>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center', marginBottom: '20px' }}>
            {isEditEpisode ? 'Chỉnh sửa tập' : 'Thêm tập'}
          </Typography>
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            onSubmit={handleSubmit((values: any) => {
              handleForm(values, session?.access_token);
            })}
          >
            {fields.map((field: any, index) => {
              let isExistingEpisode = false;
              if (!isEditEpisode) {
                isExistingEpisode = field._id ? true : false;
              }

              return (
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
                      {...register(`episodes.${index}.seasons`, { required: true })}
                      label="Seasons"
                      sx={{ width: '100%' }}
                      disabled={isEditEpisode ? true : isExistingEpisode}
                    />
                    <TextField
                      {...register(`episodes.${index}.episode`, { required: true })}
                      label={`Episode ${index + 1}`}
                      sx={{ width: '100%' }}
                      disabled={isEditEpisode ? true : isExistingEpisode}
                    />
                    <TextField
                      {...register(`episodes.${index}.title`, { required: true })}
                      label={`Title episode ${index + 1}`}
                      sx={{ width: '100%' }}
                      disabled={isExistingEpisode}
                    />
                    <TextField
                      {...register(`episodes.${index}.subtitle`)}
                      label="Subtitle"
                      sx={{ width: '100%' }}
                      disabled={isExistingEpisode}
                    />
                    <TextField
                      {...register(`episodes.${index}.url`, { required: true })}
                      label="URL"
                      sx={{ width: '100%' }}
                      disabled={isExistingEpisode}
                    />
                  </Box>
                  <Button onClick={() => handleRemove(index, field._id, session?.access_token)}>Xóa</Button>
                </Box>
              );
            })}
            {isEditEpisode ? null : (
              <Button onClick={() => append({ title: '', episode: '', seasons: '', subtitle: '', url: '' })}>Thêm tập</Button>
            )}

            <Button
              variant="outlined"
              type="submit"
              sx={{
                marginTop: '20px',
                width: '50%',
              }}
            >
              {isEditEpisode ? 'Lưu lại' : 'Tạo mới'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ModalEpisodes;
