import React, { Component } from 'react';
import styled from 'styled-components';
import {graphql, QueryRenderer} from 'react-relay';
import environment from '../../router/Environment';
import {Table, TableHead, TableCell, TableRow} from "react-toolbox/lib/table";

const Container = styled.div`
  clear: both;
`;

class Home extends Component {
  render() {
    return (
      <Container>
        <QueryRenderer
          environment={environment}
          query={graphql`
            query HomeQuery {
              getProjects {
                projectId,
                name,
                description
              }  
            }
          `}
          variables={{}}
          render={({error, props}) => {
            console.log(error);
            console.log(props);
            if (error) {
              return <div>{error.toString()}</div>;
            }
            if (!props) {
              return <div>Loading...</div>;
            }
            return <div>
              <Table>
                <TableHead>
                  <TableCell><div>ID</div></TableCell>
                  <TableCell><div>Name</div></TableCell>
                  <TableCell><div>Description</div></TableCell>
                  <TableCell><div>Number of Tasks</div></TableCell>
                </TableHead>
                {props.getProjects.map((project, idx) => (
                  <TableRow key={idx}>
                    <TableCell><div>{project.projectId}</div></TableCell>
                    <TableCell><div>{project.name}</div></TableCell>
                    <TableCell><div>{project.description}</div></TableCell>
                    <TableCell><div>{project.taskCount}</div></TableCell>
                  </TableRow>
                ))}
              </Table>
            </div>;
          }}
        />
      </Container>
    );
  }
}

export default Home;
