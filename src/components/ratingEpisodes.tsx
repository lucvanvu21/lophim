'use client';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Tooltip } from '@mui/material';

interface IDataRateItem {
  episodes: {
    vote_average?: number;
    episode_number: number;
    name: string;
    season_number: number;
  }[];
}

type IDataRate = IDataRateItem[];
const getBackgroundColor = (vote_average?: number) => {
  // console.log('---vote_average--->', vote_average);
  if (vote_average === undefined) return 'transparent';
  if (vote_average >= 9) return 'rgb(24, 106, 59)';
  if (vote_average >= 8) return 'rgb(40, 180, 99)';
  if (vote_average >= 7) return 'rgb(244, 208, 63)';
  if (vote_average >= 5) return 'rgb(243, 156, 18)';
  if (vote_average >= 3) return 'rgb(231, 76, 60)';
  return 'rgb(99, 57, 116)';
};

const RatingEpisodes = ({ dataRate }: { dataRate: IDataRate }) => {
  // console.log('---dtrate--->', dataRate);
  return (
    <>
      {/* <TableContainer component={Paper}> */}
      <TableContainer
        sx={{
          maxWidth: '80%',
          margin: 'auto',
          backgroundColor: 'transparent',
          display: 'flex',
          maxHeight: '70vh', // Giới hạn chiều cao tại đây
          overflowY: 'auto',
        }}
      >
        <Table
          sx={{
            // width: 'auto',
            width: 'auto', // Chiều rộng tự động
            // tableLayout: 'auto',
            borderCollapse: 'separate', // Tách các ô ra
            borderSpacing: '8px',
          }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ border: 'none' }}></TableCell>
              {dataRate.map((_, seasonIndex) => (
                <TableCell
                  align="center"
                  key={`season-${seasonIndex}`}
                  sx={{ color: 'white', fontWeight: 'bold', fontSize: '0.9rem', padding: '6px' }}
                >
                  Mùa {seasonIndex + 1}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataRate[0]?.episodes.map((_, episodeIndex) => (
              <TableRow key={`episode-${episodeIndex}`}>
                <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold', padding: '6px', width: '60px' }}>
                  Tập {episodeIndex + 1}
                </TableCell>
                {dataRate.map((season, seasonIndex) => (
                  <Tooltip key={`episode-${seasonIndex}`} title={season.episodes[episodeIndex]?.name}>
                    <TableCell
                      align="center"
                      key={`season-${seasonIndex}-episode-${episodeIndex}`}
                      sx={{
                        backgroundColor: getBackgroundColor(season.episodes[episodeIndex]?.vote_average),
                        color: (season?.episodes[episodeIndex]?.vote_average ?? 0) >= 9 ? 'white' : 'black',
                        fontWeight: '600',
                        // padding: '6px',
                        width: '60px',
                        height: '40px',
                        maxWidth: '80px',
                        // margin: '5px'
                        border: 'none',
                        borderRadius: '8px',
                      }}
                    >
                      {season.episodes[episodeIndex]?.vote_average || ''}
                    </TableCell>
                  </Tooltip>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* </TableContainer> */}
    </>
  );
};

export default RatingEpisodes;
