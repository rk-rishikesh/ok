import React, { useState, useEffect } from "react";
// nodejs library that concatenates classes
import classnames from "classnames";

// reactstrap components

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardImg,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Modal,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  UncontrolledTooltip,
  Row,
  Col,
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import NoLoginNav from "components/Navbars/NoLoginNav.js";
import Web3 from "web3";

import { useMoralis } from "react-moralis";

import Login from "views/pages/Login.js";

function Landing() {
  const [loading, setLoading] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const {
    Moralis,
    authenticate,
    signup,
    login,
    isAuthenticated,
    user,
    setUserData,
    userError,
    isUserUpdating,
    logout,
    isAuthenticating,
    enableWeb3,
  } = useMoralis();

  const membershipContractAddress =
    "0x1Bb4A46d93c988496c0D8dA0F06D06bA19E1ad0F";
  const membershipContractABI = [
    {
      inputs: [
        { internalType: "uint64", name: "subscriptionId", type: "uint64" },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        { internalType: "address", name: "have", type: "address" },
        { internalType: "address", name: "want", type: "address" },
      ],
      name: "OnlyCoordinatorCanFulfill",
      type: "error",
    },
    {
      inputs: [],
      name: "MEMBERSHIP_FEES",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "badgeCount",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "certificateCount",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "secretKey", type: "uint256" },
        { internalType: "uint256", name: "tokenID", type: "uint256" },
      ],
      name: "claimBadge",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "secretKey", type: "uint256" },
        { internalType: "uint256", name: "tokenID", type: "uint256" },
      ],
      name: "claimCertificate",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "secretKey", type: "uint256" },
        { internalType: "uint256", name: "tokenID", type: "uint256" },
      ],
      name: "claimDegree",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "secretKey", type: "uint256" },
        { internalType: "uint256", name: "tokenID", type: "uint256" },
      ],
      name: "claimJobTitle",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "degreeCount",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getBadgeMembership",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "getCertificateMembership",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "getDegreeMembership",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "getJobTitleMembership",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "isBadgeMember",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "isCertificateMember",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "isDegreeMember",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "isJobTitleMember",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "jobCount",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "memberCount",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "requestId", type: "uint256" },
        { internalType: "uint256[]", name: "randomWords", type: "uint256[]" },
      ],
      name: "rawFulfillRandomWords",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "requestRandomWords",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "string", name: "userMail", type: "string" },
        { internalType: "uint256", name: "tokenID", type: "uint256" },
      ],
      name: "rewardBadge",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "string", name: "userMail", type: "string" },
        { internalType: "uint256", name: "tokenID", type: "uint256" },
      ],
      name: "rewardCertificate",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "string", name: "userMail", type: "string" },
        { internalType: "uint256", name: "tokenID", type: "uint256" },
      ],
      name: "rewardDegree",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "string", name: "userMail", type: "string" },
        { internalType: "uint256", name: "tokenID", type: "uint256" },
      ],
      name: "rewardJobTitle",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "s_randomWords",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "s_requestId",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "userBadges",
      outputs: [
        { internalType: "uint256", name: "tokenID", type: "uint256" },
        { internalType: "address", name: "by", type: "address" },
        { internalType: "string", name: "userMail", type: "string" },
        { internalType: "uint256", name: "secretKey", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "userCertificates",
      outputs: [
        { internalType: "uint256", name: "tokenID", type: "uint256" },
        { internalType: "address", name: "by", type: "address" },
        { internalType: "string", name: "userMail", type: "string" },
        { internalType: "uint256", name: "secretKey", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "userDegrees",
      outputs: [
        { internalType: "uint256", name: "tokenID", type: "uint256" },
        { internalType: "address", name: "by", type: "address" },
        { internalType: "string", name: "userMail", type: "string" },
        { internalType: "uint256", name: "secretKey", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "userJobTitles",
      outputs: [
        { internalType: "uint256", name: "tokenID", type: "uint256" },
        { internalType: "address", name: "by", type: "address" },
        { internalType: "string", name: "userMail", type: "string" },
        { internalType: "uint256", name: "secretKey", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  const jobTitleContractAddress = "0x8134Ed12d5ccaee3e80bD12967276CbE70C6E278";
  const jobTitleContractABI = [
    {
      inputs: [{ internalType: "address", name: "owner", type: "address" }],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        { indexed: true, internalType: "address", name: "to", type: "address" },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [],
      name: "_tokenIds",
      outputs: [{ internalType: "uint256", name: "_value", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "owner", type: "address" }],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
      ],
      name: "claimFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "claimed",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "string", name: "_tokenURI", type: "string" }],
      name: "createNFT",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getUnlockTime",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "ownerOf",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
        { internalType: "bytes", name: "_data", type: "bytes" },
      ],
      name: "safeClaimFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
      ],
      name: "safeClaimFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
      name: "supportsInterface",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
      name: "tokenByIndex",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "uint256", name: "index", type: "uint256" },
      ],
      name: "tokenOfOwnerByIndex",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "tokenURI",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  var account;

  useEffect(async () => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, []);

  const getBadgeMembership = async () => {
    setLoading(true);
    await Moralis.enableWeb3();
    const web3 = new Web3(Moralis.provider);
    console.log(web3);

    const accounts = await web3.eth.getAccounts();
    account = accounts[0];

    console.log(account);

    const membership = new web3.eth.Contract(
      membershipContractABI,
      membershipContractAddress
    );
    membership.methods
      .getBadgeMembership()
      .send({ from: account, value: 10000000000000000 })
      .on("transactionHash", (hash) => {
        console.log(hash);
        setLoading(false);
      });

    console.log("Getting Membership");
  };

  const getCertificateMembership = async () => {
    setLoading(true);
    await Moralis.enableWeb3();
    const web3 = new Web3(Moralis.provider);
    console.log(web3);

    const accounts = await web3.eth.getAccounts();
    account = accounts[0];

    console.log(account);

    const membership = new web3.eth.Contract(
      membershipContractABI,
      membershipContractAddress
    );
    membership.methods
      .getCertificateMembership()
      .send({ from: account, value: 10000000000000000 })
      .on("transactionHash", (hash) => {
        console.log(hash);
        setLoading(false);
      });

    console.log("Getting Membership");
  };

  const getDegreeMembership = async () => {
    setLoading(true);
    await Moralis.enableWeb3();
    const web3 = new Web3(Moralis.provider);
    console.log(web3);

    const accounts = await web3.eth.getAccounts();
    account = accounts[0];

    console.log(account);

    const membership = new web3.eth.Contract(
      membershipContractABI,
      membershipContractAddress
    );
    membership.methods
      .getDegreeMembership()
      .send({ from: account, value: 10000000000000000 })
      .on("transactionHash", (hash) => {
        console.log(hash);
        setLoading(false);
      });

    console.log("Getting Membership");
  };

  const getJobTitleMembership = async () => {
    setLoading(true);
    await Moralis.enableWeb3();
    const web3 = new Web3(Moralis.provider);
    console.log(web3);

    const accounts = await web3.eth.getAccounts();
    account = accounts[0];

    console.log(account);

    const membership = new web3.eth.Contract(
      membershipContractABI,
      membershipContractAddress
    );
    membership.methods
      .getJobTitleMembership()
      .send({ from: account, value: 10000000000000000 })
      .on("transactionHash", (hash) => {
        console.log(hash);
        setLoading(false);
      });

    console.log("Getting Membership");
  };

  const createJobTitle = async () => {
    setLoading(true);
    await Moralis.enableWeb3();
    const web3 = new Web3(Moralis.provider);
    console.log(web3);

    const accounts = await web3.eth.getAccounts();
    account = accounts[0];

    console.log(account);

    const jobTitle = new web3.eth.Contract(
      jobTitleContractABI,
      jobTitleContractAddress
    );

    jobTitle.methods
      .createNFT(
        "https://bafkreigygpvenvxjwktna7nzgd3kddegxttyaywcmotsfkohtrmdrtsk6a.ipfs.nftstorage.link/"
      )
      .send({ from: account })
      .on("transactionHash", (hash) => {
        console.log(hash);
        setLoading(false);
      });
    setIsMember(true);
    console.log("Creating Job Title");
  };

  if (!isAuthenticated) {
    return (
      <>
        <NoLoginNav />
        <main>
          <div className="position-relative">
            {/* shape Hero */}
            <section className="section section-lg section-shaped pb-80 bg-gradient-dark">
              <div className="shape shape-style-1 shape-default">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <Container className="py-lg-md d-flex">
                <div className="col px-0">
                  <Row>
                    <Col lg="8">
                      <h1 className="display-3 text-white">
                        <span>‎</span>
                      </h1>
                      {/* <h1 className="display-3 text-white">
                    <span>Your's Truely</span>
                  </h1> */}
                      <p className="lead text-white">
                        Your's truely is a platform that enables various parties
                        to mint Non Transferable Badges, Certificates, Job
                        Titles and Degree in form of NFTs and reward them to the
                        recipients.
                      </p>
                    </Col>
                  </Row>
                </div>
              </Container>
            </section>
            {/* 1st Hero Variation */}
          </div>
          <br />
          <br />
          <br />
          <br />
          <div className="bg-gradient-secondary">
            <section className="section section-lg pt-lg-2 mt--200 ">
              <Container>
                <Row className="justify-content-center">
                  <Col lg="12">
                    <Row className="row-grid">
                      <Col lg="6">
                        <Card className="card-lift--hover shadow border-0">
                          <CardBody className="py-3">
                            <div className="icon icon-shape icon-shape-primary rounded-circle mb-4">
                              <i className="ni ni-check-bold" />
                            </div>
                            <h6 className="text-primary text-uppercase">
                              Badge Membership
                            </h6>
                            <p className="description mt-3">
                              COST : 0.01 MATIC/ Year
                            </p>

                            <Button
                              className="mt-4"
                              color="primary"
                              href="#pablo"
                              onClick={() => getBadgeMembership()}
                            >
                              Get Now
                            </Button>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col lg="6">
                        <Card className="card-lift--hover shadow border-0">
                          <CardBody className="py-3">
                            <div className="icon icon-shape icon-shape-success rounded-circle mb-4">
                              <i className="ni ni-paper-diploma" />
                            </div>
                            <h6 className="text-success text-uppercase">
                              Certificate Membership
                            </h6>
                            <p className="description mt-3">
                              COST : 0.01 MATIC/ Year
                            </p>

                            <Button
                              className="mt-4"
                              color="success"
                              href="#pablo"
                              onClick={(e) => getCertificateMembership()}
                            >
                              Get Now
                            </Button>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                    <Row className="row-grid">
                      <Col lg="6">
                        <Card className="card-lift--hover shadow border-0">
                          <CardBody className="py-3">
                            <div className="icon icon-shape icon-shape-warning rounded-circle mb-4">
                              <i className="ni ni-hat-3" />
                            </div>
                            <h6 className="text-warning text-uppercase">
                              Degree Membership
                            </h6>
                            <p className="description mt-3">
                              COST : 0.01 MATIC/ Year
                            </p>

                            <Button
                              className="mt-4"
                              color="warning"
                              href="#pablo"
                              onClick={(e) => getDegreeMembership()}
                            >
                              Get Now
                            </Button>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col lg="6">
                        <Card className="card-lift--hover shadow border-0">
                          <CardBody className="py-3">
                            <div className="icon icon-shape icon-shape-info rounded-circle mb-4">
                              <i className="ni ni-badge" />
                            </div>
                            <h6 className="text-info text-uppercase">
                              Job Title Membership
                            </h6>
                            <p className="description mt-3">
                              COST : 0.01 MATIC/ Year
                            </p>

                            <Button
                              className="mt-4"
                              color="info"
                              href="#pablo"
                              onClick={(e) => getJobTitleMembership()}
                            >
                              Get Now
                            </Button>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Container>
            </section>
          </div>
          {isMember ? (
            <div>
              <div>
                <section className="section section-lg bg-gradient-default">
                  <Container className="pt-lg pb-300">
                    <Row className="text-center justify-content-center">
                      <Col lg="10">
                        <h2 className="display-3 text-white">
                          Create Job Title
                        </h2>
                        <p className="lead text-white"></p>
                      </Col>
                    </Row>
                    <Row className="row-grid mt-5">
                      <Col lg="4">
                        <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                          <i className="ni ni-settings text-primary" />
                        </div>
                        <h5 className="text-white mt-3">Build Trust</h5>
                        <p className="text-white mt-3">
                          Reward a new employee with a Job title using
                          Blockchain, will make it verifiable and thus build
                          trust.
                        </p>
                      </Col>
                      <Col lg="4">
                        <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                          <i className="ni ni-ruler-pencil text-primary" />
                        </div>
                        <h5 className="text-white mt-3">Hire Best</h5>
                        <p className="text-white mt-3">
                          As the reposotory of the employess develops on this
                          platform it would help all the participating companies
                          would be able to verify the candidate previous job
                          role.
                        </p>
                      </Col>
                      <Col lg="4">
                        <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                          <i className="ni ni-atom text-primary" />
                        </div>
                        <h5 className="text-white mt-3">Save time</h5>
                        <p className="text-white mt-3">
                          With the ease in verification it would help in saving
                          cost and time of hiring a new candidate.
                        </p>
                      </Col>
                    </Row>
                  </Container>
                  {/* SVG separator */}
                  <div className="separator separator-bottom separator-skew zindex-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="none"
                      version="1.1"
                      viewBox="0 0 2560 100"
                      x="0"
                      y="0"
                    >
                      <polygon
                        className="fill-white"
                        points="2560 0 2560 100 0 100"
                      />
                    </svg>
                  </div>
                </section>
              </div>
              <div>
                <section className="section section-lg pt-lg-0 section-contact-us">
                  <Container>
                    <Row className="justify-content-center mt--300">
                      <Col lg="8">
                        <Card className="bg-gradient-secondary shadow">
                          <CardBody className="p-lg-5">
                            <h4 className="mb-1">Input the Job Role Details</h4>
                            <p className="mt-0">
                              These details would be upload on IPFS and passed
                              on to the smart contract, please be careful.
                            </p>
                            <FormGroup className={classnames("mt-5", {})}>
                              <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="ni ni-world-2" />
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                  placeholder="Company Name"
                                  type="text"
                                  // onFocus={e => this.setState({ nameFocused: true })}
                                  // onBlur={e => this.setState({ nameFocused: false })}
                                />
                              </InputGroup>
                            </FormGroup>
                            <FormGroup
                              className={classnames({
                                // focused: this.state.emailFocused
                              })}
                            >
                              <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="ni ni-paper-diploma" />
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                  placeholder="Job Title"
                                  type="text"
                                  // onFocus={e => this.setState({ emailFocused: true })}
                                  // onBlur={e => this.setState({ emailFocused: false })}
                                />
                              </InputGroup>
                            </FormGroup>
                            <FormGroup className="mb-4">
                              <Input
                                className="form-control-alternative"
                                cols="80"
                                name="name"
                                rows="4"
                                type="file"
                              />
                            </FormGroup>
                            <div>
                              <Button
                                block
                                className="btn-round"
                                color="default"
                                size="lg"
                                type="button"
                                onClick={(e) => createJobTitle()}
                              >
                                Create Job Title
                              </Button>
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </Container>
                </section>
              </div>
            </div>
          ) : (
            <></>
          )}

          <section className="section section-lg bg-gradient-secondary">
            <Container>
              <Row className="row-grid justify-content-center">
                <Col className="text-center" lg="8">
                  <h2 className="display-3">
                    <span className="text-success">Powered By</span>
                  </h2>
                  <br />
                  <br />
                  <br />
                  <div className="text-center">
                    <Row className="justify-content-center">
                      <Col lg="2" xs="4">
                        <a id="tooltip255035741" target="_blank">
                          <img
                            alt="..."
                            className="img-fluid rounded-circle"
                            src={require("assets/img/logo/chainlinkLogo.png")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip255035741"
                        >
                          Chainlink
                        </UncontrolledTooltip>
                      </Col>
                      <Col lg="2" xs="4">
                        <a id="tooltip265846671" target="_blank">
                          <img
                            alt="..."
                            className="img-fluid rounded-circle"
                            src={require("assets/img/logo/moralisLogo.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip265846671"
                        >
                          Moralis
                        </UncontrolledTooltip>
                      </Col>
                      <Col lg="2" xs="4">
                        <a id="tooltip233150499" target="_blank">
                          <img
                            alt="..."
                            className="img-fluid rounded-circle"
                            src={require("assets/img/logo/polygonLogo.png")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip233150499"
                        >
                          Polygon
                        </UncontrolledTooltip>
                      </Col>
                      <Col lg="2" xs="4">
                        <a id="tooltip308866163" target="_blank">
                          <img
                            alt="..."
                            className="img-fluid rounded-circle"
                            src={require("assets/img/logo/filecoinLogo.png")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip308866163"
                        >
                          FileCoin
                        </UncontrolledTooltip>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
      </>
    );
  } else {
    return (
      <>
        <DemoNavbar />
        <main>
          <div className="position-relative">
            {/* shape Hero */}
            <section className="section section-lg section-shaped pb-80 bg-gradient-dark">
              <div className="shape shape-style-1 shape-default">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <Container className="py-lg-md d-flex">
                <div className="col px-0">
                  <Row>
                    <Col lg="8">
                      <h1 className="display-3 text-white">
                        <span>‎</span>
                      </h1>
                      {/* <h1 className="display-3 text-white">
                        <span>Your's Truely</span>
                      </h1> */}
                      <p className="lead text-white">
                        Your's truely is a platform that enables various parties
                        to mint Non Transferable Badges, Certificates, Job
                        Titles and Degree in form of NFTs and reward them to the
                        recipients.
                      </p>
                    </Col>
                  </Row>
                </div>
              </Container>
            </section>
            {/* 1st Hero Variation */}
          </div>
          <br />
          <br />
          <br />
          <br />
          <div className="bg-gradient-secondary">
            <section className="section section-lg pt-lg-2 mt--200 ">
              <Container>
                <Row className="justify-content-center">
                  <Col lg="12">
                    <Row className="row-grid">
                      <Col lg="6">
                        <Card className="card-lift--hover shadow border-0">
                          <CardBody className="py-3">
                            <div className="icon icon-shape icon-shape-primary rounded-circle mb-4">
                              <i className="ni ni-check-bold" />
                            </div>
                            <h6 className="text-primary text-uppercase">
                              Badge Membership
                            </h6>
                            <p className="description mt-3">
                              COST : 0.01 MATIC/ Year
                            </p>

                            <Button
                              className="mt-4"
                              color="primary"
                              href="#pablo"
                              onClick={() => getBadgeMembership()}
                            >
                              Get Now
                            </Button>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col lg="6">
                        <Card className="card-lift--hover shadow border-0">
                          <CardBody className="py-3">
                            <div className="icon icon-shape icon-shape-success rounded-circle mb-4">
                              <i className="ni ni-paper-diploma" />
                            </div>
                            <h6 className="text-success text-uppercase">
                              Certificate Membership
                            </h6>
                            <p className="description mt-3">
                              COST : 0.01 MATIC/ Year
                            </p>

                            <Button
                              className="mt-4"
                              color="success"
                              href="#pablo"
                              onClick={(e) => getCertificateMembership()}
                            >
                              Get Now
                            </Button>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                    <Row className="row-grid">
                      <Col lg="6">
                        <Card className="card-lift--hover shadow border-0">
                          <CardBody className="py-3">
                            <div className="icon icon-shape icon-shape-warning rounded-circle mb-4">
                              <i className="ni ni-hat-3" />
                            </div>
                            <h6 className="text-warning text-uppercase">
                              Degree Membership
                            </h6>
                            <p className="description mt-3">
                              COST : 0.01 MATIC/ Year
                            </p>

                            <Button
                              className="mt-4"
                              color="warning"
                              href="#pablo"
                              onClick={(e) => getDegreeMembership()}
                            >
                              Get Now
                            </Button>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col lg="6">
                        <Card className="card-lift--hover shadow border-0">
                          <CardBody className="py-3">
                            <div className="icon icon-shape icon-shape-info rounded-circle mb-4">
                              <i className="ni ni-badge" />
                            </div>
                            <h6 className="text-info text-uppercase">
                              Job Title Membership
                            </h6>
                            <p className="description mt-3">
                              COST : 0.01 MATIC/ Year
                            </p>

                            <Button
                              className="mt-4"
                              color="info"
                              href="#pablo"
                              onClick={(e) => getJobTitleMembership()}
                            >
                              Get Now
                            </Button>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Container>
            </section>
          </div>
          {!isMember ? (
            <div>
              <div>
                <section className="section section-lg bg-gradient-default">
                  <Container className="pt-lg pb-300">
                    <Row className="text-center justify-content-center">
                      <Col lg="10">
                        <h2 className="display-3 text-white">
                          Create Job Title
                        </h2>
                        <p className="lead text-white"></p>
                      </Col>
                    </Row>
                    <Row className="row-grid mt-5">
                      <Col lg="4">
                        <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                          <i className="ni ni-settings text-primary" />
                        </div>
                        <h5 className="text-white mt-3">Build Trust</h5>
                        <p className="text-white mt-3">
                          Reward a new employee with a Job title using
                          Blockchain, will make it verifiable and thus build
                          trust.
                        </p>
                      </Col>
                      <Col lg="4">
                        <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                          <i className="ni ni-ruler-pencil text-primary" />
                        </div>
                        <h5 className="text-white mt-3">Hire Best</h5>
                        <p className="text-white mt-3">
                          As the reposotory of the employess develops on this
                          platform it would help all the participating companies
                          would be able to verify the candidate previous job
                          role.
                        </p>
                      </Col>
                      <Col lg="4">
                        <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                          <i className="ni ni-atom text-primary" />
                        </div>
                        <h5 className="text-white mt-3">Save time</h5>
                        <p className="text-white mt-3">
                          With the ease in verification it would help in saving
                          cost and time of hiring a new candidate.
                        </p>
                      </Col>
                    </Row>
                  </Container>
                  {/* SVG separator */}
                  <div className="separator separator-bottom separator-skew zindex-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="none"
                      version="1.1"
                      viewBox="0 0 2560 100"
                      x="0"
                      y="0"
                    >
                      <polygon
                        className="fill-white"
                        points="2560 0 2560 100 0 100"
                      />
                    </svg>
                  </div>
                </section>
              </div>
              <div>
                <section className="section section-lg pt-lg-0 section-contact-us">
                  <Container>
                    <Row className="justify-content-center mt--300">
                      <Col lg="8">
                        <Card className="bg-gradient-secondary shadow">
                          <CardBody className="p-lg-5">
                            <h4 className="mb-1">Input the Job Role Details</h4>
                            <p className="mt-0">
                              These details would be upload on IPFS and passed
                              on to the smart contract, please be careful.
                            </p>
                            <FormGroup className={classnames("mt-5", {})}>
                              <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="ni ni-world-2" />
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                  placeholder="Company Name"
                                  type="text"
                                  // onFocus={e => this.setState({ nameFocused: true })}
                                  // onBlur={e => this.setState({ nameFocused: false })}
                                />
                              </InputGroup>
                            </FormGroup>
                            <FormGroup
                              className={classnames({
                                // focused: this.state.emailFocused
                              })}
                            >
                              <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="ni ni-paper-diploma" />
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                  placeholder="Job Title"
                                  type="text"
                                  // onFocus={e => this.setState({ emailFocused: true })}
                                  // onBlur={e => this.setState({ emailFocused: false })}
                                />
                              </InputGroup>
                            </FormGroup>
                            <FormGroup className="mb-4">
                              <Input
                                className="form-control-alternative"
                                cols="80"
                                name="name"
                                rows="4"
                                type="file"
                              />
                            </FormGroup>
                            <div>
                              <Button
                                block
                                className="btn-round"
                                color="default"
                                size="lg"
                                type="button"
                                onClick={(e) => createJobTitle()}
                              >
                                Create Job Title
                              </Button>
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </Container>
                </section>
              </div>
            </div>
          ) : (
            <></>
          )}

          <section className="section section-lg bg-gradient-secondary">
            <Container>
              <Row className="row-grid justify-content-center">
                <Col className="text-center" lg="8">
                  <h2 className="display-3">
                    <span className="text-success">Powered By</span>
                  </h2>
                  <br />
                  <br />
                  <br />
                  <div className="text-center">
                    <Row className="justify-content-center">
                      <Col lg="2" xs="4">
                        <a id="tooltip255035741" target="_blank">
                          <img
                            alt="..."
                            className="img-fluid rounded-circle"
                            src={require("assets/img/logo/chainlinkLogo.png")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip255035741"
                        >
                          Chainlink
                        </UncontrolledTooltip>
                      </Col>
                      <Col lg="2" xs="4">
                        <a id="tooltip265846671" target="_blank">
                          <img
                            alt="..."
                            className="img-fluid rounded-circle"
                            src={require("assets/img/logo/moralisLogo.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip265846671"
                        >
                          Moralis
                        </UncontrolledTooltip>
                      </Col>
                      <Col lg="2" xs="4">
                        <a id="tooltip233150499" target="_blank">
                          <img
                            alt="..."
                            className="img-fluid rounded-circle"
                            src={require("assets/img/logo/polygonLogo.png")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip233150499"
                        >
                          Polygon
                        </UncontrolledTooltip>
                      </Col>
                      <Col lg="2" xs="4">
                        <a id="tooltip308866163" target="_blank">
                          <img
                            alt="..."
                            className="img-fluid rounded-circle"
                            src={require("assets/img/logo/filecoinLogo.png")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip308866163"
                        >
                          FileCoin
                        </UncontrolledTooltip>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
      </>
    );
  }
}
export default Landing;
