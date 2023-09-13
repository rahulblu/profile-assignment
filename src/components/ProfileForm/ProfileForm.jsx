import React, { useEffect, useState } from "react";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";

const style = {
  position: "absolute",
  display: "flex",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ProfileForm = ({
  modalOpen,
  handleClose,
  onSubmitForm,
  formData,
  setFormData,
  data,
  actionType,
}) => {
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "isVerified") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else
      setFormData({
        ...formData,
        [name]: value,
      });
  };

  useEffect(() => {
    const mappedData = {
      imageUrl: data?.getProfileById?.image_url,
      firstName: data?.getProfileById?.first_name,
      lastName: data?.getProfileById?.last_name,
      email: data?.getProfileById?.email,
      description: data?.getProfileById?.description,
      isVerified: data?.getProfileById?.is_verified,
      updateProfileId: data?.getProfileById?.id,
    };
    setFormData(mappedData);
  }, [data]);

  console.log("dataaa", data);

  return (
    <Fade in={modalOpen}>
      <Box sx={style}>
        <Container maxWidth="sm">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{ color: (theme) => theme.palette.secondary.main }}
            >
              {actionType}{" "}
            </Typography>
            <IconButton color="inherit" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <form onSubmit={onSubmitForm}>
            <Grid item xs={3}>
              <TextField
                name="imageUrl"
                label="Image Link"
                variant="outlined"
                margin="normal"
                defaultValue={
                  data?.getProfileById?.image_url
                    ? data?.getProfileById?.image_url
                    : null
                }
                fullWidth
                InputLabelProps={{
                  style: {
                    color: "white",
                  },
                  shrink: true,
                }}
                onChange={handleChange}
              />
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="First Name"
                  variant="outlined"
                  margin="normal"
                  name="firstName"
                  defaultValue={data?.getProfileById?.first_name ?? null}
                  onChange={handleChange}
                  InputLabelProps={{
                    style: {
                      color: "white",
                    },
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Last Name"
                  variant="outlined"
                  name="lastName"
                  margin="normal"
                  defaultValue={data?.getProfileById?.last_name ?? null}
                  onChange={handleChange}
                  InputLabelProps={{
                    style: {
                      color: "white",
                    },
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
            <TextField
              label="Email"
              name="email"
              defaultValue={data?.getProfileById?.email ?? null}
              variant="outlined"
              margin="normal"
              fullWidth
              onChange={handleChange}
              InputLabelProps={{
                style: {
                  color: "white",
                },
                shrink: true,
              }}
            />
            <TextField
              label="Description"
              name="description"
              variant="outlined"
              multiline
              defaultValue={data?.getProfileById?.description ?? null}
              rows={4}
              margin="normal"
              fullWidth
              onChange={handleChange}
              InputLabelProps={{
                style: {
                  color: "white",
                },
                shrink: true,
              }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography color="secondary">Talent is verified</Typography>
              <Switch
                name="isVerified"
                // checked={}
                defaultChecked={data?.getProfileById?.is_verified ?? false}
                onChange={handleChange}
                color="default"
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
              mt={2}
            >
              <Button
                sx={{
                  textTransform: "none",
                  minWidth: "max-content",
                }}
                variant="outlined"
                color="primary"
                type="submit"
              >
                {actionType}
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </Fade>
  );
};

export default ProfileForm;
