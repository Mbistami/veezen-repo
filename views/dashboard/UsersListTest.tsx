import React, { useState } from "react";
import Image from "next/image";
import useApi from "@hooks/useApi";
import { Button, IconButton, Typography, LinearProgress } from "@mui/material";
import CreateNewUser from "../../components/Dialog/CreateNewUser";
import { Add, Refresh, Male, Female, MoreHoriz } from "@mui/icons-material";
import { useUser } from "@hooks/useUser";
import { usersRoles } from "../../utils";

function UsersListTest() {
  const { Authorization, id } = useUser();
  const { data, loading, mutate } = useApi(
    "https://api.veezen.com/api/v1/account/fetch/entreprise/users",
    { method: "GET" },
    { Authorization }
  );
  const [users, setUsers] = useState(data);
  const [open, setOpen] = useState(false);

  React.useEffect(() => {
    if (data?.length > 0) setUsers(data);
  }, [data]);
  React.useEffect(() => console.log(loading), [loading]);
  return (
    <main className="w-full ">
      <CreateNewUser
        open={open}
        handleClose={() => {
          setOpen(false);
          mutate();
        }}
      />
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col">
          <h4 className="m-0 text-lg font-semibold">Users list</h4>
          <Typography
            className="m-0 text-xs font-primary text-light"
            variant="subtitle1"
          >
            Here you can view/add users.
          </Typography>
        </div>
        <div className="flex flex-row items-center">
          {/* <Button
            className="h-7 px-3 dark:text-gray-500"
            
            endIcon={<Add />}
          >
            New Employee
          </Button> */}
          <IconButton onClick={() => setOpen(true)}>
            <Add />
          </IconButton>
          <IconButton onClick={() => mutate()}>
            <Refresh />
          </IconButton>
        </div>
      </div>
      <div className="overflow-hidden mb-8 w-full rounded-lg shadow-xs mt-4">
        <div className="overflow-x-auto w-full">
          {loading && <LinearProgress />}
          <table className="w-full whitespace-no-wrap">
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-left text-gray-500  uppercase bg-gray-50 ">
                <th className="py-3 px-4">Client</th>
                <th className="py-3 px-4">Coordonnees</th>
                <th className="py-3 px-4">Gender</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Options</th>
              </tr>
            </thead>
            <tbody className="bg-white ">
              {users?.length > 0 ? (
                users
                  ?.sort(function (a: any, b: any) {
                    if (a.roles[0] < b.roles[0]) {
                      return -1;
                    }
                    if (a.roles[0] > b.roles[0]) {
                      return 1;
                    }
                    return 0;
                  })
                  ?.map((e: any, i: any) => {
                    return (
                      <tr key={i} className="text-gray-700 relative">
                        <td className="py-3 px-4">
                          <div className="flex items-center text-sm relative">
                            <div className=" flex relative flex-col justify-center mr-3 w-8 h-8 rounded-full">
                              <Image
                                layout="fixed"
                                width={44}
                                height={44}
                                className="object-cover mx-4 w-full h-full rounded-full"
                                src={e?.avatar}
                                alt="ok"
                                loading="lazy"
                              />
                              <div
                                className="absolute inset-0 rounded-full shadow-inner"
                                aria-hidden="true"
                              ></div>
                            </div>
                            <div>
                              <div className="flex flex-row gap-2">
                                <p className="pl-5 font-semibold ">
                                  {e?.userName}
                                </p>
                              </div>
                              <p className="pl-5 text-xs text-gray-600 ">
                                {e?.function}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <div>
                            <p className="font-semibold ">{e?.email}</p>
                            <p className="text-xs text-gray-600 ">
                              {e?.phoneNumber}
                            </p>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          {e?.gender === "MALE" ? (
                            <Male />
                          ) : e?.gender === "FEMALE" ? (
                            <Female />
                          ) : (
                            <p className="pl-2">-</p>
                          )}
                        </td>
                        <td className="py-2 px-3 text-xs flex flex-row gap-1">
                          <span className="py-1 px-2 font-semibold leading-tight text-green-700  bg-green-100  rounded-full">
                            {
                              usersRoles().find((v) => v?.value === e?.roles[0])
                                ?.label
                            }
                          </span>
                          <div className="">
                            {id === e?.id ? (
                              <p className="py-1 px-2 font-semibold leading-tight text-green-700  bg-green-100  rounded-full">
                                You
                              </p>
                            ) : null}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <MoreHoriz />
                        </td>
                      </tr>
                    );
                  })
              ) : (
                <tr>
                  <td>
                    <p>No users available</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="grid py-3 px-4 text-xs font-semibold tracking-wide text-gray-500  uppercase bg-gray-50  border-t  sm:grid-cols-9">
          <span className="flex col-span-3 items-center">
            Showing {users?.length ? users?.length : "-"}
          </span>
          <span className="col-span-2"></span>
        </div>
      </div>
    </main>
  );
}

export default UsersListTest;
