import React from "react";
import { useGetMentorsQuery } from "../api/apiSlice";
import { apiSlice } from "../api/apiSlice";

const Home = () => {
  const isLoading = true;
  return (
    <div>
      <ul>
        <li>{isLoading ? "True" : "False"}</li>
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

const loadData = async (store) => {
  console.log("execcc");

  //await Promise.all(store.dispatch(apiSlice.util.getRunningQueriesThunk()));
  //console.log("Data fetched");
};

export { loadData };

export default Home;
