import React from "react";
import { useGetMentorsQuery } from "../api/apiSlice";
import { apiSlice } from "../api/apiSlice";

const Home = () => {
  const { data, currentData, error, isLoading, isSuccess } = useGetMentorsQuery(
    {
      skip: 0,
      take: 10,
      searchText: "",
    }
  );

  console.log("In component");
  console.log(data);
  console.log(error);
  console.log(isSuccess);

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
