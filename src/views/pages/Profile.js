import React, { useState, useEffect } from "react";
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
  Row,
  Col,
} from "reactstrap";

import classnames from "classnames";
import BigNumber from "bignumber.js";
// core components
import LogoutNav from "components/Navbars/LogoutNav.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import Login from "views/pages/Login.js";

// wallet
import Web3 from "web3";

import {
  useMoralis,
  useMoralisCloudFunction,
  useNFTBalances,
} from "react-moralis";

function Profile() {
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


  const toggleNavs = (e, state, index) => {
    e.preventDefault();
    setToggleState(index);
  };

  const toggleModal = () => {
    setModalState(!modal);
  };

  const [jobCreatedList, setJobCreatedList] = useState([]);
  const [jobOwnedList, setJobOwnedList] = useState([]);

  const [state, setToggleState] = useState(1);
  const [modal, setModalState] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;

    await Moralis.enableWeb3();
    const web3 = new Web3(Moralis.provider);
    console.log(web3);

    const accounts = await web3.eth.getAccounts();
    var account = accounts[0];

    setJobCreatedList([]);
    var jobListCreated = [];

    const createdJobTitles = await getNFTBalances({
      params: {
        chain: "mumbai",
        address: account,
        token_address: "0x8134Ed12d5ccaee3e80bD12967276CbE70C6E278",
      },
    });

    var i = 0;
    // for (i = 0; i < createdJobTitles.total; i++) {
    //   jobListCreated.push(createdJobTitles.result[i]);
    // }

    setJobCreatedList(jobListCreated);

    console.log(jobListCreated);

    // ********************************************************************
    
    var jobListOwn = [];
    setJobOwnedList([]);
    const membership = new web3.eth.Contract(
      membershipContractABI,
      membershipContractAddress
    );

    const jobCount = await membership.methods.jobCount().call();

    console.log(jobCount);

    var j = 0;
    for (j = 1; j <= jobCount; j++) {
      const job = await membership.methods.userJobTitles(j).call();
      jobListOwn.push(job);
    }

    console.log(jobListOwn);
    setJobOwnedList(jobListOwn);
  }, []);

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

  const { getNFTBalances, data, error, isLoading, isFetching } =
    useNFTBalances();

  const connectWallet = async () => {
    console.log("Connect Wallet")
    setLoading(true);
    await Moralis.enableWeb3();
    const web3 = new Web3(Moralis.provider);
    console.log(web3);

    const accounts = await web3.eth.getAccounts();
    
    const y = await enableWeb3({ onComplete: () => {Moralis.link(accounts[0])} });
    console.log(y);
    setLoading(false);
  };

  const rewardJobTitle = async (recipientMail, tokenID) => {
    setLoading(true);
    await Moralis.enableWeb3();
    const web3 = new Web3(Moralis.provider);
    console.log(web3);

    const accounts = await web3.eth.getAccounts();
    var account = accounts[0];

    console.log(account);

    const membership = new web3.eth.Contract(
      membershipContractABI,
      membershipContractAddress
    );
    membership.methods
      .rewardJobTitle(recipientMail, tokenID)
      .send({ from: account })
      .on("transactionHash", (hash) => {
        console.log(hash);
        setLoading(false);
      });

    console.log("Rewarding Job Title");
  };
  
  const claim = async (tokenID) => {
    setLoading(true);
    await Moralis.enableWeb3();
    const web3 = new Web3(Moralis.provider);
    console.log(web3);

    const accounts = await web3.eth.getAccounts();
    var account = accounts[0];

    console.log(account);

    const membership = new web3.eth.Contract(
      membershipContractABI,
      membershipContractAddress
    );
/* global BigInt */
    membership.methods
      .claimJobTitle(1, tokenID)
      .send({ from: account })
      .on("transactionHash", (hash) => {
        console.log(hash);
        setLoading(false);
      });

    console.log("Claiming Job Title");
  };

  const divStyle = {
    width: "100%",
    height: "826px",
    backgroundImage: `url(https://cdn.dribbble.com/users/121337/screenshots/916951/small-load.gif)`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  if (!isAuthenticated) {
    return <Login />;
  } else if (loading) {
    return (
      <div style={divStyle}>
        {/* <img
        
          // style={{ marginLeft: "25%", marginTop: "8%" }}
          //src="https://www.faiver.io/static/media/loader.58607b10.gif"
        /> */}
      </div>
    );
  } else {
    return (
      <>
        {/* IF USER IS LOGGED IN THEN THIS PAGE ELSE LOGIN PAGE */}
        <LogoutNav />
        <main className="profile-page">
          <section className="section-profile-cover section-shaped my-0 bg-gradient-dark">
            {/* Circles background */}
            <div className="shape shape-style-1 shape-default alpha-4">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            {/* SVG separator */}
            <div className="separator separator-bottom separator-skew">
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
          <section className="section">
            <Container>
              <Card className="card-profile shadow mt--300">
                <div className="px-4">
                  <Row className="justify-content-center">
                    <Col className="order-lg-2" lg="3">
                      <div className="card-profile-image">
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          <img
                            alt="..."
                            className="rounded-circle"
                            src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png"
                          />
                        </a>
                      </div>
                    </Col>
                    <Col
                      className="order-lg-3 text-lg-right align-self-lg-center"
                      lg="4"
                    >
                      <div className="card-profile-actions py-4 mt-lg-0">
                        <Button
                          className="float-right"
                          color="default"
                          href="#pablo"
                          onClick={(e) => connectWallet()}
                          size="sm"
                        >
                          Connect Wallet
                        </Button>
                      </div>
                    </Col>
                  </Row>
                  <br />
                  <br />
                  <br />
                  <div className="text-center mt-5">
                    <h3>
                      Example{" "}
                      <span className="font-weight-light"></span>
                    </h3>
                    <div className="h6 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      
                    </div>
                    <div className="h6 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      
                    </div>
                    <div>
                      <i className="ni education_hat mr-2" />
                      
                    </div>
                  </div>
                  <div className="mt-5 py-5 border-top text-center"></div>
                </div>
              </Card>
              <Col lg="14">
            <div className="nav-wrapper">
              <Nav
                className="nav-fill flex-column flex-md-row"
                id="tabs-icons-text"
                pills
                role="tablist"
              >
                <NavItem>
                  <NavLink
                    aria-selected={state === 1}
                    className={classnames("mb-sm-3 mb-md-0", {
                      active: state === 1,
                    })}
                    onClick={(e) => toggleNavs(e, "iconTabs", 1)}
                    href="#pablo"
                    role="tab"
                  >
                    <i className="ni ni-cloud-upload-96 mr-2" />
                    My Creation
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    aria-selected={state === 2}
                    className={classnames("mb-sm-3 mb-md-0", {
                      active: state === 2,
                    })}
                    onClick={(e) => toggleNavs(e, "iconTabs", 2)}
                    href="#pablo"
                    role="tab"
                  >
                    <i className="ni ni-bell-55 mr-2" />
                    My Collection
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
            <TabContent activeTab={"iconTabs" + state}>
              <TabPane tabId="iconTabs1">
                <div className="mt-1 py-4 text-center">
                  <Row className="justify-content-center">
                    <Col lg="9">
                      {jobCreatedList.length > 0 && (
                        <section>
                          <Container>
                            <Row className="justify-content-center">
                              <Col lg="12">
                                <Row className="row-grid">
                                  {jobCreatedList.map((e, key) => (
                                    <Col lg="12">
                                      <br />
                                      <br />
                                      <Card
                                        className="card-lift--hover shadow border-0"
                                        key={key}
                                        onClick={console.log(
                                          jobCreatedList[key].owner_of
                                        )}
                                      >
                                        <CardImg
                                          alt="..."
                                          src={`https://bafkreihrs7qywzlppbydgin4gwbjvqlnjyab7a6jjrxhciu7dmionjvzla.ipfs.nftstorage.link/`}
                                          top
                                        />

                                        <CardBody>
                                          <h6>CONTRACT ADDRESS : {jobCreatedList[key].token_address}</h6>
                                          <a></a>
                                          <h6>COLLECTION       : {jobCreatedList[key].name}</h6>
                                          <a></a>
                                          <h6>CREATOR          : {jobCreatedList[key].owner_of}</h6>
                                          <a></a>
                                        </CardBody>
                                        {/* Form Modal */}

                                        <Button
                                          block
                                          color="default"
                                          type="button"
                                          className="mr-4"
                                          onClick={toggleModal}
                                        >
                                          Reward To Recipient
                                        </Button>
                                        <Modal
                                          className="modal-dialog-centered"
                                          size="sm"
                                          isOpen={modal}
                                          toggle={toggleModal}
                                          key={key}
                                        >
                                          <div className="modal-body p-0">
                                            <Card className="bg-secondary shadow border-0">
                                              <CardBody className="px-lg-5 py-lg-5">
                                                <div className="text-center text-muted mb-4">
                                                  <small>Set the Recipient</small>
                                                </div>
                                                <Form role="form">
                                                  <FormGroup
                                                    className={classnames(
                                                      "mb-3"
                                                    )}
                                                  >
                                                    <InputGroup className="input-group-alternative">
                                                      <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                          <i className="ni ni-email" />
                                                        </InputGroupText>
                                                      </InputGroupAddon>
                                                      <Input
                                                        placeholder="Recipient Email ID"
                                                        type="email"
                                                      />
                                                    </InputGroup>
                                                  </FormGroup>
                                                  <div className="text-center">
                                                    <Button
                                                      className="my-4"
                                                      color="primary"
                                                      type="button"
                                                      onClick={() =>
                                                        rewardJobTitle("example@gmail.com", 1)
                                                      }
                                                    >
                                                      Reward !!
                                                    </Button>
                                                  </div>
                                                </Form>
                                              </CardBody>
                                            </Card>
                                          </div>
                                        </Modal>
                                      </Card>
                                    </Col>
                                  ))}
                                </Row>
                              </Col>
                            </Row>
                          </Container>
                        </section>
                      )}
                    </Col>
                  </Row>
                </div>
              </TabPane>
              <TabPane tabId="iconTabs2">
                <div className="mt-1 py-4 text-center">
                  <Row className="justify-content-center">
                    <Col lg="9">
                      {jobOwnedList.length > 0 && (
                        <section>
                          <Container>
                            <Row className="justify-content-center">
                              <Col lg="12">
                                <Row className="row-grid">
                                  {jobOwnedList.map((e, key) => (
                                    <Col lg="12">
                                      <br />
                                      <br />
                                      <Card
                                        className="card-lift--hover shadow border-0"
                                        onClick={console.log(
                                          jobOwnedList[key]
                                        )}
                                      >
                                        <CardImg
                                          alt="..."
                                          src={`https://bafkreihrs7qywzlppbydgin4gwbjvqlnjyab7a6jjrxhciu7dmionjvzla.ipfs.nftstorage.link/`}
                                          top
                                        />

                                        <CardBody>
                                          <h6>Recipient Mail  : {jobOwnedList[key].userMail}</h6>
                                          <a></a>
                                          <h6>Secret Key      : {jobOwnedList[key].secretKey}</h6>
                                          <a>
                                            
                                          </a>

                                          <h6>Rewarded By     : {jobOwnedList[
                                              key
                                            ].by}</h6>
                                          <a>
                                            
                                          </a>
                                        </CardBody>

                                    
                                          <Button
                                            block
                                            color="default"
                                            type="button"
                                            className="mr-4"
                                            onClick={() =>
                                              claim(1)
                                            }
                                          >
                                            CLAIM !
                                          </Button>
                                    
                                      </Card>
                                    </Col>
                                  ))}
                                </Row>
                              </Col>
                            </Row>
                          </Container>
                        </section>
                      )}
                    </Col>
                  </Row>
                </div>
              </TabPane>
            </TabContent>
          </Col>
            </Container>

            
          </section>

        </main>
        <SimpleFooter />
      </>
    );
  }
}

export default Profile;

// 0xF9053A15f04C3D56404Ee57da87722cF27ECaDc7
// 0x04424d3A13fbe530A423E4Cf7B75A75240d72263
