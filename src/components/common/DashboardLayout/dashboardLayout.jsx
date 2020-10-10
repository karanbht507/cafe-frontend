import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme, fade } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import HomeIcon from "@material-ui/icons/Home";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import DateRangeIcon from "@material-ui/icons/DateRange";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Badge from "@material-ui/core/Badge";
import AccountCircle from "@material-ui/icons/AccountCircle";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import InputBase from "@material-ui/core/InputBase";
import Toolbar from "@material-ui/core/Toolbar";
import MoreIcon from "@material-ui/icons/MoreVert";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import { Backdrop, Fade, TextField } from "@material-ui/core";
import instance from "../../../axios";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  sideMenuHead: {
    display: "flex",
    justifyContent: "space-between",
  },
  center: {
    borderTop: "1px solid #fff",
    paddingTop: ".5rem",
    paddingLeft: ".5rem",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 1),
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "#000",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "30%"
  },
  form: {
    width: "58%",
    margin: "0 auto"
  }
}));

export default function Container(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [expandDashboard, setExpandDashboard] = React.useState(false);
  const [expandUIElements, setExpandUIElements] = React.useState(false);
  const [expandCalendar, setExpandCalendar] = React.useState(false);
  const [isOpen, toggleModal] = React.useState(false);
  const [form, setForm] = React.useState({
    name: '',
    description: '',
    address: '',
    cafeTimings: '',
    cafeRating: '',
    costForTwo: '',
    location: ''
  });

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";

  const handleExpand = (expandListName) => {
    switch (expandListName) {
      case "UI Elements":
        setExpandUIElements(!expandUIElements);
        break;
      case "Dashboard":
        setExpandDashboard(!expandDashboard);
        break;
      case "Calendar":
        setExpandCalendar(!expandCalendar);
        break;
      default:
        return;
    }
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const renderSwitchIcon = (iconName) => {
    switch (iconName) {
      case "UI Elements":
        return <BusinessCenterIcon />;
      case "Dashboard":
        return <HomeIcon />;
      case "Calendar":
        return <DateRangeIcon />;
      default:
        return null;
    }
  };

  const handleSubmit = () => {
    instance.post('/create', form).then((res) => {
      if(res) {
        toggleModal(false)
        props.getCafes();
        setForm({})
      }
    })
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon style={{ color: "#000" }} />
            </div>
            <InputBase
              placeholder="Search cafe.…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={props.searchItem}
            />
          </div>
          <Button variant="contained" color="#fff" onClick={() => toggleModal(true)}>Create new listing</Button>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          {theme.direction === "rtl" ? (
            <>
              <Typography variant="subtitle1" noWrap>
                Locate
              </Typography>
              <IconButton onClick={handleDrawerClose}>
                <ChevronRightIcon color="disabled" />
              </IconButton>
            </>
          ) : (
            <>
              <Typography variant="subtitle1" noWrap>
                Locate
              </Typography>
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </>
          )}
        </div>

        {[
          {
            name: "Dashboard",
            state: expandDashboard,
            expandList: [{ name: "Dashboard v1" }, { name: "Dashboard v2" }],
          },
          {
            name: "UI Elements",
            state: expandUIElements,
            expandList: [{ name: "Icons" }, { name: "Grids" }],
          },
          {
            name: "Calendar",
            state: expandCalendar,
            expandList: [{ name: "January" }, { name: "February" }],
          },
        ].map((item, index) => (
          <>
            <List>
              <ListItem
                key={item.name}
                button
                onClick={() => handleExpand(item.name)}
              >
                <ListItemIcon>{renderSwitchIcon(item.name)}</ListItemIcon>
                <ListItemText primary={item.name} />
                {item.state ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
            </List>
            <Collapse in={item.state} timeout="auto" unmountOnExit>
              {item.expandList.map((listItem) => (
                <List component="div" disablePadding>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <DonutLargeIcon />
                    </ListItemIcon>
                    <ListItemText primary={listItem.name} />
                  </ListItem>
                </List>
              ))}
            </Collapse>
          </>
        ))}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div>{props.children}</div>
      </main>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isOpen}
        onClose={() => toggleModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Create listing</h2>
            <div className={classes.form}>
              <div><TextField value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required label="Cafe Name"  />
              <TextField value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} label="Cafe Description" defaultValue="" /></div>
              <TextField value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} label="Address" defaultValue="" />
              <TextField value={form.cafeTimings} onChange={(e) => setForm({ ...form, cafeTimings: e.target.value })} label="Cafe Timings" defaultValue="" />
              <TextField value={form.cafeRating} onChange={(e) => setForm({ ...form, cafeRating: e.target.value })} type="number" label="Cafe Rating" defaultValue="" />
              <TextField value={form.costForTwo} onChange={(e) => setForm({ ...form, costForTwo: e.target.value })} label="Cost for two" type="number" />
              <TextField value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} label="Location" defaultValue="" />
            </div>
            <Button variant="contained" color="primary" style={{ marginTop: 20, float: 'right' }} onClick={handleSubmit}>Create </Button>
            <Button variant="contained" style={{ marginTop: 20, float: 'right', marginRight: 20 }} onClick={() => {
              toggleModal(false)
              setForm({})
            }}>Cancel</Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
