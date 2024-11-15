import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useSession } from 'next-auth/react';


const ModelDialog = (props: any) => {
  const { data: session } = useSession();
  const { isModelOpen, setModelOpen, id, onSubmit } = props;
  // console.log('---->id:', onSubmit);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    setModelOpen(false);
  };

  return (
    <div>
      <Dialog fullScreen={fullScreen} open={isModelOpen} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{'Bạn có chắc chắn muốn xóa không?'}</DialogTitle>
        <DialogContent>
          <DialogContentText>{id}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
           Hủy Bỏ
          </Button>
          <Button onClick={() => onSubmit(id, session?.access_token)} autoFocus>
            Xác Nhân
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModelDialog;
