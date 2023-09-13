import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VerifiedIcon from "@mui/icons-material/Verified";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const CustomCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#f5f5f5",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  border: "none",
}));

const ProfileCard = ({ data, handleEditProfile, onRemoveProfile }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isVerified = data?.is_verified;
  const fullName = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 1,
        flexWrap: "nowrap",
      }}
    >
      <Typography variant="body2" noWrap>
        {data?.first_name} {data?.last_name}
      </Typography>{" "}
      {isVerified && <VerifiedIcon fontSize="small" />}
    </Box>
  );

  const email = (
    <Typography color={"grey"} variant="subtitle2" noWrap>
      {data?.email}
    </Typography>
  );

  const description = (
    <Typography variant="paragraph">{data?.description}</Typography>
  );

  const imageUrl = data?.image_url;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ minWidth: 180 }}>
      <CustomCard variant="outlined">
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: 1,
            }}
          >
            <Avatar
              alt="Remy Sharp"
              src={imageUrl}
              sx={{ width: 42, height: 42 }}
            />
            <Box
              sx={{
                display: "flex",
                width: "100%",
                flexDirection: "column",
                m: 1,
                borderRadius: 1,
              }}
            >
              {fullName}
              {email}
            </Box>
            <IconButton onClick={handleClick} >
              <MoreVertIcon />
            </IconButton>
          </Box>
          <Menu
            id={data?.id}
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
            <MenuItem onClick={() => handleEditProfile(data?.id)}>
              Edit Profile
            </MenuItem>
            <MenuItem onClick={() => onRemoveProfile(data?.id)}>
              Remove Profile
            </MenuItem>
          </Menu>
          <Box
            sx={{
              minHeight: 128,
            }}
          >
            {description}
          </Box>
        </CardContent>
      </CustomCard>
    </Box>
  );
};

export default ProfileCard;
