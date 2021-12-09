import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { ToastContainer } from "react-toastify";
import ProductScreen from "../screens/productScreen";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.f(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));
const classes = useStyles

const Product = ({ thumbnail, name, desc, images, price, productId }) => {
    return (
        <Card className={classes.root}>
            <h3>Items</h3>
            <Grid container spacing={2} direction="row" justify="flex-start" alignItems="flex-start" >
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <Card className={classes.root} variant="outlined" >
                            <CardMedia style={{ height: "250px", paddingTop: "2%" }}
                                className={classes.media}
                                image={"http://localhost:3000/assets/imgs/products/" + thumbnail}
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    {name}
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    {price}
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    adjective
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {desc}
                                </Typography>
                            </CardContent>


                            <div className="row">
                                <CardActions>
                                    <a href={`/items/${productId}` }>View</a>
                                </CardActions>
                                <CardActions>
                                    <button type="button">Add to Cart</button>
                                </CardActions>
                            </div>
                        </Card>
                    </Paper>
                </Grid>
            </Grid>

            <ToastContainer />
        </Card>





    )
}

export default Product


    // <div  className = "product" >
    //             <img src={`http://localhost:3000/assets/imgs/products/${thumbnail}`} />

    //             <div className="product-info">
    //                 <p className="info-name">{name}</p>
    //                 <p className="info-description">
    //                     {desc}
    //                 </p>
    //                 <p className="info-price">{price}</p>
    //                 <Link to={`/items/${productId}`}>View</Link>
    //             </div>
    //         </div >