import React from "react";
import { HeaderClient, NavClient, FooterClient } from "../layout/layoutclient";
import { InforSearch, Login, Admissions, Command, Government, Access } from "./infor";
import { Carousels, News, Document } from "./contenthome";
import HouseIcon from '@mui/icons-material/House';

class Home extends React.Component {
  render() {
    return (
      <>
        <div id="header">
          <HeaderClient />
          <NavClient />
        </div>
        <div id="content" className="mb-5 h-auto">
          <div className="w-95 ml-2.5% mr-2.5% h-52 mt-[1em] xl:mr-[0] xl:ml-2.5%">
            <div className="xxl:flex sm:block">
              <div className="xxl:w-75% h-40 sm:w-100%">
                <Carousels />
                <div id="news">
                  <News />
                </div>
                <div>
                  <Document />
                </div>
              </div>
              {/* Navbar right */}
              <div className="w-25% h-40 sm:hidden xxl:block"> 
                <div className="ml-4">
                  <InforSearch />
                  <div className="mt-3">
                    <Login />
                  </div>
                  <div className="mt-3">
                    <Admissions />
                  </div>
                  <div className="mt-3">
                    <Command />
                  </div>
                  <div className="mt-3">
                    <Government />
                  </div>
                  <div className="mt-3">
                    <Access />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="footer" className="">
          <FooterClient />
        </div>
      </>
    );
  }
}

export default Home;
