import React, { useEffect, useState } from "react";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_PROFILE_BY_ID } from "../../apollo/queries";
import client from "../../apollo/client";
import Modal from "@mui/material/Modal";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { DELETE_PROFILE_BY_ID, EDIT_PROFILE } from "../../apollo/mutation";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AllProfilesCardView = ({
  profilesData,
  profilesLoading,
  getAllProfiles,
}) => {
  const [isDeleted, setIsDeleted] = useState(false);
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

  const profileData = profilesData?.getAllProfiles?.profiles;

  const [getProfileById, { data, error, loading }] =
    useLazyQuery(GET_PROFILE_BY_ID);

  const [
    updateProfile,
    {
      data: updateProfileData,
      error: updateProfileError,
      loading: updateProfileLoading,
    },
  ] = useMutation(EDIT_PROFILE, { client: client });

  const [
    deleteProfileById,
    {
      data: deleteProfileData,
      error: deleteProfileError,
      loading: deleteProfileLoading,
    },
  ] = useMutation(DELETE_PROFILE_BY_ID, { client: client });

  const onSubmitForm = (event) => {
    event.preventDefault();
    updateProfile({ variables: formData });
  };

  const handleEditProfile = async (id) => {
    await getProfileById({ variables: { getProfileByIdId: id } });
    setModalOpen(true);
  };

  const onRemoveProfile = async (id) => {
    await deleteProfileById({ variables: { deleteProfileId: id } });
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

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
  
  useEffect(() => {
    if (deleteProfileData && !deleteProfileError && !deleteProfileLoading) {
      setIsDeleted(true);
      getAllProfiles({variables:{}});
    }
    if (!deleteProfileData && deleteProfileError && !deleteProfileLoading) {
      setIsDeleted(false);
    }
  }, [deleteProfileData, deleteProfileError, deleteProfileLoading]);

  return (
    <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "center" }}>
      {profilesLoading ? (
        <CircularProgress color="success" />
      ) : (
        <Grid container spacing={2}>
          {profileData?.map((item, index) => (
            <Grid item xs={12} md={3} key={index}>
              <ProfileCard
                data={item}
                handleEditProfile={handleEditProfile}
                onRemoveProfile={onRemoveProfile}
              />
            </Grid>
          ))}
        </Grid>
      )}

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
        open={isCreated || isDeleted}
        autoHideDuration={6000}
        onClose={() => {
          setIsCreated(false);
          setIsDeleted(false);
        }}
      >
        <Alert
          severity="success"
          sx={{ width: "100%" }}
          onClose={() => {
            setIsCreated(false);
            setIsDeleted(false);
          }}
        >
          Profile {isDeleted ? "deleted" : "updated"}successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AllProfilesCardView;
