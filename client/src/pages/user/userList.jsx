import React, { useEffect, useState } from "react";
import {
  Paper,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SwitchRightIcon from "@mui/icons-material/SwitchRight";
import CustomPaper from "../../components/paper";
import { getUserList } from "../api-pages";
import UserFormDialog from "./dialogsBoxes/userFormDialog";
import ConfirmationDialog from "./dialogsBoxes/confirmationDialog";

const UserList = () => {
  const [rows, setRows] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [currentSelectedUser, setCurrentSelectedUser] = useState({});
  const [actionType, setActionType] = useState(false);
  useEffect(() => {
    getAllUser();
  }, []);

  const getAllUser = () => {
    getUserList().then((res) => {
      console.log(res);
      if(res.success){
          res.data?.length>0&&setRows(res.data);
      }
     
    });
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setOpenConfirmationDialog(false)
  };
  const onClickHandler = ( data,action) => {
    if(["add","edit"].includes(action)){
      setOpenEditDialog(true);
     
    }else{
      setOpenConfirmationDialog(true)

    }
    setActionType(action);
    setCurrentSelectedUser(data);
   
  };


  return (
    <div>
      <UserFormDialog
        currentSelectedUser={currentSelectedUser}
        open={openEditDialog}
        setCurrentSelectedUser={setCurrentSelectedUser}
        handleClose={handleCloseEditDialog}
        getAllUser={getAllUser}
        isCreating={actionType==="add"?true:false}
      />

      <ConfirmationDialog
        currentSelectedUser={currentSelectedUser}
        open={openConfirmationDialog}
        handleClose={handleCloseEditDialog}
        getAllUser={getAllUser}
        isRemoving={actionType==="remove"?true:false}
      />

      <CustomPaper title="All Users">
        {" "}
        <Grid container spacing={1}>
          <Grid item xs={12} md={8} style={{ textAlign: "left" }}>
            {/* <h2>All Users</h2> */}
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              onClick={() => {
                onClickHandler("","add");
              }}
              variant="contained"
              style={{ width: "100%", display: "block" }}
            >
              +Add New User
            </Button>
          </Grid>
        </Grid>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.full_name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.role.role_name}</TableCell>
                  <TableCell>
                    <Tooltip title="EDIT" placement="left">
                      <EditIcon
                        onClick={() => {
                          onClickHandler( row,"edit");
                        }}
                        name=""
                        style={{ color: "#707070" }}
                      />
                    </Tooltip>
                    <Tooltip title="DELETE" placement="bottom">
                      <DeleteForeverIcon
                        name=""
                        onClick={() => {
                          onClickHandler( row,"remove");
                        }}
                        style={{ color: "#707070" }}
                      />
                    </Tooltip>
                    <Tooltip title="SWITCH ROLE" placement="right">
                      <SwitchRightIcon
                        name=""
                        onClick={() => {
                          onClickHandler( row,"switchRole");
                        }}
                        style={{ color: "#707070" }}
                      />
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CustomPaper>
    </div>
  );
};

export default UserList;