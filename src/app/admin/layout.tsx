import AdminSideBar from '@/components/layout/sideBar.admin';
import { Box } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <AdminSideBar />
      <ToastContainer autoClose={2000} position="bottom-right" />
      <Box component="main" sx={{ marginTop: '50px', flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
