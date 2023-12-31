import React from "react";
import { useGetMentorsQuery } from "../api/apiSlice";
import { apiSlice } from "../api/apiSlice";

const HomePage = () => {
  const { data, isLoading } = useGetMentorsQuery({
    skip: 0,
    take: 10,
    searchText: "",
  });

  return (
    <div>
      <ul>
        {!isLoading &&
          data &&
          data.mentors &&
          data.mentors.map((mentor) => (
            <li key={mentor.id}>{mentor.firstName}</li>
          ))}
      </ul>
      I'm the test 22 home component
      <button onClick={() => console.log("Clicked!!!!")}>Click me!</button>
    </div>
  );
};

const loadHomeData = async (store) => {
  const result = await store.dispatch(
    apiSlice.endpoints.getMentors.initiate({
      skip: 0,
      take: 10,
      searchText: "",
    })
  );

  await Promise.all(store.dispatch(apiSlice.util.getRunningQueriesThunk()));
};

export { loadHomeData };

export default HomePage;
