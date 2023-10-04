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
        { data?.drinks?.length> 0 ?
            cocktailsList
            :
              <p>No drinks found</p>
          }
        </Row>
      </Container>
    </>
    
    
  </div>;
};

export default FavoritesPage;
