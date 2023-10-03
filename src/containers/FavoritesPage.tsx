'use client';
import CocktailBlock from '@/components/CocktailBlock';
import { useGetCocktails } from '../api-service/cocktails';
import { FC, useState, useEffect, useRef } from 'react';
import { Cocktail } from '@/types/cocktails.types';
import styles from '../app/page.module.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Spinner } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import { useGetFavCocktails } from '../storage-service/FavoritesService';


const FavoritesPage: FC = () => {
  const childRef = useRef({});
  const [inputValue, setInputValue] = useState('');
  const { data, refetch, isLoading } = useGetFavCocktails(inputValue);

  useEffect(() => {
    refetch();
  }, [inputValue])

  const cocktailsList = data?.drinks?.map((cocktail: Cocktail) => (
    <Col xs>
      <CocktailBlock stateRef={childRef}  data={cocktail} />
    </Col>
  ));

  return <div className={styles.cocktailsWrapper}>
    <>
      <Container>
        {isLoading && <Spinner animation="grow" /> }
        <Row >
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default" >
              Search
            </InputGroup.Text>
            <Form.Control
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search by name" 
            />
          </InputGroup>
        </Row>
        <Row >
          {cocktailsList}
        </Row>
      </Container>
    </>
    
    
  </div>;
};

export default FavoritesPage;
