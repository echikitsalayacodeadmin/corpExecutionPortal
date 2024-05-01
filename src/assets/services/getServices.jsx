import { useCallback, useEffect, useState } from "react";
import { getSpecialization } from "./api/getApiCalls";

export const useGetSpecialization = () => {

    const[state,setState]=useState();
    const[specialization,setSpecialization]=useState();

    const fetchPataientsHandler = useCallback(async () => {
        try {
        
          const user = await getSpecialization();
          if(user.error){
            setState({ error: user.error });
          
          } else {
            setState({ data: user.data });
          }

          
          setSpecialization(user.data)
        } catch (error) {
        }
      }, []);

      useEffect(() => {
        fetchPataientsHandler();
      }, [fetchPataientsHandler]);
        
    return specialization;
    }