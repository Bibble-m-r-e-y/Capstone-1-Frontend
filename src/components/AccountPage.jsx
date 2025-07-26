import React, { useState, useEffect } from "react";
import "./AccountPage.css";

export default function AccountPage() {
  const [accountInfo, setAccountInfo] = useState({
    status: "",
    firstName: "",
    lastName: "",
    profileImage: null,
    email: "",
  });

  const MOCK_ACCOUNT = {
    status: "normal",
    firstName: "Bob",
    lastName: "Marcus",
    profileImage:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.bJpr9jpclIkXQT-hkkb1KQHaHa%3Fpid%3DApi&f=1&ipt=6eea697a694647f6844b77f2e6af26c1b436da886f32cfe6e5b7d8672ed64df4&ipo=images",
    email: "example@example.com",
  };

  function getAccountInformation() {
    // This will be where we fetch account information

    setAccountInfo(MOCK_ACCOUNT);
  }

  useEffect(() => {
    getAccountInformation();
  }, []);

  return (
    <div className="account-info-container">
      <img src={MOCK_ACCOUNT.profileImage} alt="" className="profile-image" />
      <h2 className="account-name">
        Welcome {MOCK_ACCOUNT.firstName} {MOCK_ACCOUNT.lastName}
      </h2>
      <h3 className="account-status">Account status: {MOCK_ACCOUNT.status}</h3>
      <h4 className="account-email">Email: {MOCK_ACCOUNT.email}</h4>
    </div>
  );
}
