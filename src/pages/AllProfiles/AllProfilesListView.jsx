import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import Modal from "@mui/material/Modal";
import { useLazyQuery, useMutation } from "@apollo/client";
import {  GET_PROFILE_BY_ID } from "../../apollo/queries";
import client from "../../apollo/client";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { EDIT_PROFILE } from "../../apollo/mutation";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AllProfilesListView = ({
  profilesData,
  profilesLoading,
  getAllProfiles,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [formData, setFormData] = useState({
    imageUrl: "",
    firstName: "",
    lastName: "",
    email: "",
    description: "",
    id: "",
  });
  const [getProfileById, { data, error, loading }] =
    useLazyQuery(GET_PROFILE_BY_ID);

  const onSubmitForm = (event) => {
    event.preventDefault();
    updateProfile({ variables: formData });
  };

  const handleEditProfile = async(id) => {
    await getProfileById({ variables: { getProfileByIdId: id } });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const onRemoveProfile = () => {};

  const [
    updateProfile,
    {
      data: updateProfileData,
      error: updateProfileError,
      loading: updateProfileLoading,
    },
  ] = useMutation(EDIT_PROFILE, { client: client });

  useEffect(() => {
    if (updateProfileData && !updateProfileError && !updateProfileLoading) {
      setIsCreated(true);
      setModalOpen(false);
      getAllProfiles();
    }
    if (!updateProfileData && updateProfileError && !updateProfileLoading) {
      setIsCreated(false);
    }
  }, [updateProfileData, updateProfileError, updateProfileLoading]);

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      sortable: false,
      width: 160,
      disableColumnMenu: true,
      headerClassName: {
        color: "blue",
      },
      renderCell: (params) => (
        <strong>
          {params.row.first_name} {params.row.last_name}
        </strong>
      ),
    },
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      sortable: false,
      pinned: "left",
      disableColumnMenu: true,
    },

    {
      field: "email",
      headerName: "Email",
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "actions",
      flex: 2,
      width: 20,
      headerAlign: "right",
      align: "right",
      disableColumnMenu: true,
      sortable: false,
      renderHeader: () => {
        return (
          <IconButton disabled aria-label="delete">
            <SettingsIcon />
          </IconButton>
        );
      },
      renderCell: (params) => {
        const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
        };
        const open = Boolean(anchorEl);
        const handleClose = () => {
          setAnchorEl(null);
        };

        return (
          <div>
            <IconButton aria-label="Edit" size="small" onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              id={params?.id}
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <MenuItem onClick={() => handleEditProfile(params?.id)}>
                Edit Profile
              </MenuItem>
              <MenuItem onClick={onRemoveProfile}>Remove Profile</MenuItem>
            </Menu>
          </div>
        );
      },
    },
    ,
  ];

  return (
    <>
      <DataGrid
        rows={profilesData?.getAllProfiles?.profiles ?? []}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        loading={profilesLoading}
        initialState={{ pinnedColumns: { left: ["name"] } }}
        components={{
          HeaderCell: (props) => (
            <div style={{ color: "blue" }}>{props.column.label}</div>
          ),
        }}
      />
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ProfileForm
          modalOpen={modalOpen}
          handleClose={handleCloseModal}
          onSubmitForm={onSubmitForm}
          formData={formData}
          setFormData={setFormData}
          data={data}
          actionType="Update Profile"
        />
      </Modal>
      <Snackbar
        open={isCreated}
        autoHideDuration={6000}
        onClose={() => setIsCreated(false)}
      >
        <Alert
          severity="success"
          sx={{ width: "100%" }}
          onClose={() => setIsCreated(false)}
        >
          Profile updated successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default AllProfilesListView;
