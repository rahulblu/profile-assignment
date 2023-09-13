import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TocIcon from "@mui/icons-material/Toc";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Box from "@mui/material/Box";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import Modal from "@mui/material/Modal";
import { useMutation } from "@apollo/client";
import client from "../../apollo/client";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { CREATE_PROFILE } from "../../apollo/mutation";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SearchBar = ({ viewType, setViewType, getAllProfiles }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [dataLoaded, setDataLoaded] = useState([]);
  const [searchedString, setSearchedString] = useState(false);
  const [formData, setFormData] = useState({
    imageUrl: "",
    firstName: "",
    lastName: "",
    email: "",
    description: "",
  });

  const onSubmitForm = (event) => {
    event.preventDefault();
    createProfile({ variables: formData });
  };

  const toggleView = (os) => {
    if (viewType === "list") {
      setViewType("card");
    }
    if (viewType === "card") {
      setViewType("list");
    } else return;
  };
  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const [
    createProfile,
    {
      data: createProfileData,
      error: createProfileError,
      loading: createProfileLoading,
    },
  ] = useMutation(CREATE_PROFILE, { client: client });

  useEffect(() => {
    if (createProfileData && !createProfileError && !createProfileLoading) {
      setIsCreated(true);
      setModalOpen(false);
      getAllProfiles();
    }
    if (!createProfileData && createProfileError && !createProfileLoading) {
      setIsCreated(false);
    }
  }, [createProfileData, createProfileError, createProfileLoading]);

  useEffect(() => {
    getAllProfiles({ variables: { searchString: searchedString } });
    return () => clearTimeout();
  }, [searchedString]);

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", marginTop: "1rem", gap: 2 }}
      mt={2}
      mb={2}
    >
      <TextField
        placeholder="Search"
        variant="outlined"
        size="small"
        fullWidth
        onChange={(e) => {
          setTimeout(() => {
            setSearchedString(e.target.value);
          }, 1500);
        }}
      />
      <Button
        sx={{
          textTransform: "none",
          minWidth: "max-content",
        }}
        variant="outlined"
        color="primary"
        startIcon={<PersonAddIcon />}
        onClick={handleOpen}
      >
        Create Profile
      </Button>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ProfileForm
          modalOpen={modalOpen}
          handleClose={handleClose}
          onSubmitForm={onSubmitForm}
          formData={formData}
          setFormData={setFormData}
          actionType="Create Profile"
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
          Profile created successfully!
        </Alert>
      </Snackbar>
      <ToggleButtonGroup size="small" value={viewType} onChange={toggleView}>
        <ToggleButton value="card" aria-label="card">
          <ViewColumnIcon />
        </ToggleButton>
        <ToggleButton value="list" aria-label="list">
          <TocIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default SearchBar;
