import 'isomorphic-unfetch';
import App, { Container } from 'next/app'
import React from 'react'
import Head from 'next/head';
import getConfig from 'next/config'
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import Typekit from 'react-typekit';
import { bp, color, fontSize } from '../variables';

const {serverRuntimeConfig, publicRuntimeConfig} = getConfig()

const client = new ApolloClient({
  uri: publicRuntimeConfig.API,
  headers: {
    authorization: `Bearer ${publicRuntimeConfig.API_TOKEN}`,
  },
});

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return <Container>
      <Head>
        <link rel="stylesheet" href="/static/normalize.css" />
        <Typekit kitId="ggo2pml" />
      </Head>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }
        body {
          color: ${color.black};
          font-family: "source-sans-pro", sans-serif;
          ${fontSize(16)};
          height: 100%;
          line-height: 1.25rem;
          overflow-x: hidden;
          .content-wrapper {
            background-color: ${color.almostWhite};
            flex: 1 0 auto;
            width: 100%;
          }
          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
          a {
            color: ${color.black};
            text-decoration: none;
          }
          p {
            margin: 0 0 1.25rem;
          }
          p a {
            text-decoration: none;
            transition: background 0.3s ease-out;
          }
          strong {
            font-weight: normal;
          }
          em {
            font-style: normal;
          }
          h2 {
            ${fontSize(36, 42)};
            font-weight: normal;
            margin: 0 0 38px;
          }
          h3 {
            ${fontSize(30, 42)};
            font-weight: normal;
            margin: 0 0 36px;
          }
          h4 {
            ${fontSize(25, 42)};
            font-weight: normal;
            margin: 4px 0 20px;
          }
          ul {
            list-style: none;
            margin: 0 0 1.25rem;
            padding-left: 0;
            li {
              background-size: 8px;
              margin-bottom: 1.25rem;
              padding-left: 20px;
              a {
                text-decoration: none;
              }
            }
          }
          ol {
            margin: 0 0 1.25rem;
            padding-left: 20px;
            li {
              margin-bottom: 1.25rem;
              a {
                text-decoration: none;
              }
            }
          }
          table {
            width: 100%;
            tr {
              text-align: left;
              td {
                padding: 10px 0;
              }
            }
          }
          .field {
            line-height: 25px;
            a {
              color: ${color.linkBlue};
            }
          }
          label {
            color: ${color.darkGrey};
            font-family: "source-code-pro", sans-serif;
            ${fontSize(13)};
            text-transform: uppercase;
          }
          .field-wrapper {
            display: flex;
            margin-bottom: 18px;
            @media ${bp.xs_smallUp} {
              margin-bottom: 30px;
            }
            &::before {
              @media ${bp.xs_smallUp} {
                background-position: top 11px right 14px;
                background-repeat: no-repeat;
                background-size: 20px;
                border-right: 1px solid ${color.midGrey};
                content: '';
                display: block;
                height: 60px;
                left: 0;
                margin-right: 14px;
                min-width: calc((100vw / 16) * 1.5);
                padding-right: 14px;
                position: absolute;
                width: calc((100vw / 16) * 1.5);
              }
            }
            & > div {
              @media ${bp.xs_smallUp} {
                margin-top: 8px;
              }
            }
          }
        }
      `}</style>
    </Container>
  }
}

export default MyApp
