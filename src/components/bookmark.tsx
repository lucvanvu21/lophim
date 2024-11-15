'use client';
import { moviesRequestApiClient } from '@/requestApi/movies/moviesClient';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Box, Button } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useEffect, useState, useCallback } from 'react';

const Bookmark = ({ movieId }) => {
  const { data: session } = useSession();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleLogin = () => {
    alert('Bạn chưa đăng nhập!');
  };

  const handleToggleFavorite = async () => {
    if (!session) {
      return;
    }
    setIsDisabled(true);
    const body = { movieId };
    if (isFavorite) {
      const del = await moviesRequestApiClient.removeFavorites(movieId, session?.access_token);
      // console.log('---->del:', del);
    } else {
      await moviesRequestApiClient.addFavorites(body, session.access_token);
    }
    setIsFavorite(!isFavorite); // Cập nhật trạng thái yêu thích
    setTimeout(() => setIsDisabled(false), 1000);
  };
  // console.log('---->isFavorite:', isFavorite);
  // Gọi API để kiểm tra trạng thái yêu thích khi component mount
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!session) return;

      const data = await moviesRequestApiClient.findFavorites(movieId, session?.access_token);
      // console.log('---->data:', data);
      setIsFavorite(data.data);
    };

    fetchFavorites();
  }, [session, movieId]);

  if (!session) {
    return (
      <Box>
        <Button variant="outlined" color="info" onClick={handleLogin}>
          <BookmarkBorderIcon /> Thêm vào yêu thích
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Button variant={isFavorite ? 'contained' : 'outlined'} color={isFavorite? 'error' : 'info'} onClick={handleToggleFavorite} disabled={isDisabled}>
        <BookmarkBorderIcon /> {isFavorite ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
      </Button>
    </Box>
  );
};

export default Bookmark;
