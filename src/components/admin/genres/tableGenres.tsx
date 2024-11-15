'use client';
import React from 'react';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import { green, red } from '@mui/material/colors';
import { EditGenres } from '@/app/admin/genres/genres';
import { toast } from 'react-toastify';
import { moviesRequestApiClient } from '@/requestApi/movies/moviesClient';
const TableGenres = (props: any) => {
  const { res, token } = props;
  const [openEditG, setOpenEditG] = React.useState(false);
  const [selectedGenres, setSelectedGenres] = React.useState<any>(null);
  const [openCreate, setOpenCreate] = React.useState(false);
  const handleDelete = async (id: string, token: string) => {
    const res = await moviesRequestApiClient.deleteGenres(id, token);
    // console.log('---->res:', res);
    if (res.statusCode === 200) {
      toast.success('Xóa thành công');
    }
    // console.log('---->res:', res);
  };
  return (
    <>
      <Box sx={{ width: '90vw' }}>
        <Button variant="contained" onClick={() => setOpenCreate(true)}>
          Create Genres
        </Button>

        <TableContainer component={Paper} sx={{ maxHeight: '76vh', minHeight: '76vh' }}>
          <Table sx={{ minWidth: 250 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">STT</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Slug</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {res?.data?.result.map((row: any,index:number) => (
                <TableRow key={row?.slug} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="center">{index+1}</TableCell>

                  <TableCell component="th" scope="row" align="center">
                    {row?.name}
                  </TableCell>
                  <TableCell align="center">{row?.slug}</TableCell>
                  <TableCell align="center">{row?.status ? 'ON' : 'OFF'}</TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() => {
                        setOpenEditG(true);
                        setSelectedGenres(row);
                      }}
                    >
                      <EditNoteIcon sx={{ color: 'white', ':hover': { color: green[800] } }} />
                    </Button>
                    <Button onClick={() => handleDelete(row?._id, token)}>
                      <DeleteIcon sx={{ color: 'white', ':hover': { color: red[500] } }}></DeleteIcon>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {openEditG && <EditGenres open={openEditG} setOpen={setOpenEditG} genres={selectedGenres} token={token} />}
      {openCreate && <EditGenres open={openCreate} setOpen={setOpenCreate} token={token} />}
    </>
  );
};

export default TableGenres;
