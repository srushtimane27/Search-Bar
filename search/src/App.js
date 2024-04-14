import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './App.css'

const App = () => {
    const [allProducts,setAllProducts] = useState([]);
    // console.log(allProducts, "allProducts")

    const [search, setSearch] = useState("");
    const [filterProducts, setFilterProducts] = useState([]);
    const [productNotFound, setProductNotFound] = useState(false);

    const router = useNavigate();

    async function getProducts() {
        // api call
        // alert("Jiii")
        try {
            const response = await axios.get('https://fakestoreapi.com/products');
            console.log(response, "response from fakestore api")
            if (response?.data.length) {
                setAllProducts(response.data)
                setFilterProducts(response.data)
            }

        } catch (error) {
            console.log(error)
        }
    }

    function handleChange(event){
        console.log(event.target.value);
        setSearch(event.target.value);

        let userword = event.target.value.toLowerCase();

        const filteredProduts = allProducts.filter((product) => { // 20 -> men
          // 20 -> 4 -> 4 result show
          return product.title.toLowerCase().includes(userword);
        });

        // setAllProducts(filteredProduts)
    
        setFilterProducts(filteredProduts); // 20 -> 4
    
        console.log(filteredProduts, "filteredProduts");

        if (filteredProduts.length === 0) {
            setProductNotFound(true);
          } else {
            setProductNotFound(false);
          }

    }

    async function redirect(id){
        // alert(id)
        router(`/fake-store-single-product/${id}`)
    }

    useEffect(() => {
        getProducts()
    }, [])


  return (
    <div className='App'>
        <h1>FakeStoreApi</h1>

        <div>
            <h2>Search Product: </h2>
            <input placeholder='Mens...' value={search} onChange={handleChange} />
        </div>

        {productNotFound && <div style={{ marginTop: '20px', color: 'red' }}>Product not found</div>}

        {filterProducts?.length ? <div style={{ marginTop: '100px', display: 'flex', flexWrap: "wrap", justifyContent: 'space-around' }}>
                {filterProducts.map((productObj) => (
                    <div onClick={()=>redirect(productObj.id)} style={{ width: "25%", border: "2px solid black", height: "400px" }}>
                        <img style={{ height: "50%", width: '80%' }} src={productObj.image} />
                        <h3>{productObj.title}</h3>
                        <p>Price : ₹{productObj.price} </p>
                        <p>Ratings : {productObj.rating?.rate} ★ </p>
                        <button style={{height: "30px", width:"150px", backgroundColor: "Black", color: "white"}}>ADD TO CART</button>
                    </div>
                ))}
            </div> : <div>Loading</div>}
    </div>
  )
}

export default App

// {allProducts?.length? <div></div> : <div>Loading....</div>}
