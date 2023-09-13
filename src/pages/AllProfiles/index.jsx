import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { GET_ALL_PROFILES } from "../../apollo/queries";
import SearchBar from "./searchBar";
import { Container } from "@mui/material";
import AllProfilesListView from "./AllProfilesListView";
import AllProfilesCardView from "./AllProfilesCardView";

const AllProfiles = () => {
  const [viewType, setViewType] = useState("card");
  const [getAllProfiles, { data, error, loading }] =
    useLazyQuery(GET_ALL_PROFILES);

  useEffect(() => {
    getAllProfiles({ variables: {} });
  }, []);
  
  return (
    <Container>
      <SearchBar viewType={viewType} setViewType={setViewType} getAllProfiles={getAllProfiles}/>
      
      {viewType === "list" && (
        <AllProfilesListView profilesData={data} profilesLoading={loading} getAllProfiles={getAllProfiles}/>
      )}
      {viewType === "card" && (
        <AllProfilesCardView profilesData={data} profilesLoading={loading} getAllProfiles={getAllProfiles}/>
      )}
    </Container>
  );
};

export default AllProfiles;
