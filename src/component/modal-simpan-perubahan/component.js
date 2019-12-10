import React, { useContext, useEffect, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import IconPopUp from '../../assets/alert-circle.png';
import { Grid, Typography } from '@material-ui/core';
import { ProfileContext } from '../../context/profile';
import { updateProfile } from '../../services/profile';

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`
  };
}

function SimpleModal(props) {
  const { classes } = props;
  const [modalStyle] = React.useState(getModalStyle);
  const [data, setData] = useContext(ProfileContext);

  const { open, handleClose } = props;
  const [nama, setNama] = useState(data.nama);
  const [nik, setNik] = useState(data.nik);

  useEffect(() => {
    // console.log(data.name);
  }, []);
  const handleClick = () => {
    const data = {
      name: nama,
      nik: nik
    };
    const user = JSON.parse(localStorage.getItem('user'));
    updateProfile(user.id, data).then(() => {
      props.history.push('/profil');
    });

    console.log(data);
  };
  console.log('test', classes.paper);
  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={handleClose}
    >
      <div style={modalStyle} className={classes.paper}>
        <Grid container align="center" className={classes.container}>
          <Grid item xs>
            <img src={IconPopUp} alt="icon" className={classes.icon} />
          </Grid>
          <Grid item xs className={classes.gridItemText}>
            <Typography className={classes.question}>
              Apakah anda yakin ingin melakukan perubahan ini?
            </Typography>
          </Grid>
          <Grid item xs className={classes.gridItemTwo}>
            <Grid container spacing={0} align="center">
              <Grid item xs>
                <Button className={classes.buttonCancel} onClick={handleClose}>
                  <Typography
                    style={{
                      textTransform: 'none',
                      color: '#F7A647',
                      fontSize: '14px'
                    }}
                  >
                    Batal
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs>
                <Button
                  className={classes.buttonAgree}
                  style={{
                    background: '#F7A647'
                  }}
                  onClick={handleClick}
                >
                  <Typography
                    style={{
                      textTransform: 'none',
                      color: '#FFFFFF',
                      fontSize: '14px'
                    }}
                  >
                    Iya
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Modal>
  );
}
export default SimpleModal;
