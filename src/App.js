import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Products from "./containers/Products";
import ProductItem from "./components/ProductItem";
import "./App.css";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://pangaea-interviews.now.sh/api/graphql",
  cache: new InMemoryCache(),
});

function App() {
  const GetProducts = () => {
    const { loading, error, data } = useQuery(gql`
      {
        products {
          id
          title
          image_url
          price(currency: USD)
        }
      }
    `);

    if (loading) return <p>Loading...</p>;
    if (error) return console.log(error);
    // if (error) return <p>Error :(</p>;

    return data.products.map((product, i) => (
      <ProductItem
        key={i}
        _id={product.id}
        _image={product.image_url}
        _title={product.title}
        _price={product.price}
      />
    ));
  };

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Header />
        <div className="products">
          <div className="row main-holder">
            <GetProducts />
          </div>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
