import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import AppBar from "../../component/appbar";
import ListData from "../../component/card-anggota";
import FAB from "../../component/fab";
import { getListAnggota } from "../../services/anggota";
import ContentLoader from "react-content-loader";

const MyLoader = () => (
  <ContentLoader
    height={146}
    width={400}
    speed={2}
    primaryColor="#F4F4F4"
    secondaryColor="#ecebeb"
  >
    <rect x="123" y="23" rx="0" ry="0" width="0" height="0" />
    <rect x="48" y="59" rx="0" ry="0" width="210" height="48" />
    <rect x="311" y="58" rx="0" ry="0" width="64" height="48" />
  </ContentLoader>
);

function ListAnggota(props) {
  const { classes } = props;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const getAnggota = async () => {
      const family = await getListAnggota(user.id);
      setData(family.row[0]);
      console.log(family.row[0].name);
    };
    getAnggota();
  }, []);

  return (
    <Container maxWidth="xs" className={classes.container}>
      <AppBar goBack title="Anggota Keluarga" />
      {isLoading == true ? (
        <div className={classes.loader}>
          <MyLoader />
        </div>
      ) : (
        <div className={classes.gridUpper}>
          {data.map(item => {
            return (
              <Grid item className={classes.itemList}>
                <ListData
                  nik={item.nik}
                  name={item.name}
                  click={() => props.history.push(`/list-anggota/${data.id}`)}
                />
              </Grid>
            );
          })}
        </div>
      )}

      <FAB />
    </Container>
  );
}

export default ListAnggota;
