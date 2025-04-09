import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import Login from "../Components/Login";
import Register from "../Components/Register";
import { useNavigate, useParams } from "react-router-dom";
import LoadingHome from "../Components/LoadingHome";

const Auth = () => {
    const [Index, setIndex] = useState(0)
    // const [Loading , setLoading] = useState(true)

    const navigate = useNavigate()

  return (
    <div>
      <Navbar />
      <div>
        <Tabs index={Index}>
            <TabPanels>
                <TabPanel>
                    <Login setIndex={setIndex}/>
                </TabPanel>
                <TabPanel>
                    <Register setIndex={setIndex}/>
                </TabPanel>
            </TabPanels>

        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
