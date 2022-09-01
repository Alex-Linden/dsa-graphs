/** Node class for graph. */

class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}


/** Graph class. */

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  /** add Node instance and add it to nodes property on graph. */
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  /** add array of new Node instances and adds to them to nodes property. */
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.addVertex(vertex);
    }
  }

  /** add edge between vertices v1,v2 */
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  /** remove edge between vertices v1,v2 */
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  /** remove vertex from graph:
   *
   * - remove it from nodes property of graph
   * - update any adjacency lists using that vertex
   */
  removeVertex(vertex) {
    this.nodes.delete(vertex);

    for (let node of this.nodes) {
      if (node.adjacent.has(vertex)) {
        node.adjacent.delete(vertex);
      }
    }
  }

  /** traverse graph with DFS and returns array of Node values */
  depthFirstSearch(start) {
    let dfsArray = [];
    let seen = new Set([start]);
    let toVisitStack = [start];

    while (toVisitStack.length > 0) {
      let current = toVisitStack.pop();

      dfsArray.push(current.value);

      for (let neighbor of current.adjacent) {
        if (!seen.has(neighbor)) {
          toVisitStack.push(neighbor);
          seen.add(neighbor);
        }
      }
    }

    return dfsArray;

  }

  /** traverse graph with BDS and returns array of Node values */
  breadthFirstSearch(start) {
    let bfsArray = [start.value];
    let seen = new Set([start]);

    while (bfsArray.length < this.nodes.size) {

      for (let node of seen) {
        for (let neighbor of node.adjacent) {
          if (!seen.has(neighbor)) {
            bfsArray.push(neighbor.value);
            seen.add(neighbor);
          }
        }
      }
    }

    return bfsArray;
  }

  /** find the distance of the shortest path from the start vertex to the end vertex */
  distanceOfShortestPath(start, end) {
    let seen = new Set([start]);
    let toVisitStack = [start];
    let count = 0;
    let minDistance;

    while (toVisitStack.length > 0) {
      let current = toVisitStack.pop();
      // if (current === end) {
      //   minDistance = minDistance < count ? minDistance : count;
      // }

      count++;

      for (let neighbor of current.adjacent) {
        if (neighbor === end) {
          minDistance = minDistance < count ? minDistance : count;
        } else if (!seen.has(neighbor)) {
          toVisitStack.push(neighbor);
          seen.add(neighbor);
        }
      }
    }
    return minDistance;

  }

}

module.exports = { Graph, Node };
