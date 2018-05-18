import * as React from 'react'
import { IProvenanceGraphTraverser, NodeIdentifier } from '@visualstorytelling/provenance-core'
import { ProvenanceGraphNode } from './provenance-react';

export interface IProvenanceGraphProps {
    provenance: IProvenanceGraphTraverser
}

export class ProvenanceGraph extends React.Component<IProvenanceGraphProps, {}> {
    onClick = (nodeIdentifier: NodeIdentifier) => {
        this.props.provenance.toStateNode(nodeIdentifier).then(() => {
            // do something after node has been made current
        });
    }

    onGraphChange = () => {
        this.forceUpdate();
    }

    componentDidMount() {
        const graph = this.props.provenance.graph
        graph.on('nodeAdded', this.onGraphChange)
        graph.on('currentChanged', this.onGraphChange)
        graph.on('nodeChanged', this.onGraphChange)
    }

    componentWillUnmount() {
        const graph = this.props.provenance.graph
        graph.off('nodeAdded', this.onGraphChange)
        graph.off('currentChanged', this.onGraphChange)
        graph.off('nodeChanged', this.onGraphChange)
    }

    render() {
        const root = this.props.provenance.graph.root
        return (
            <ol>
                <ProvenanceGraphNode node={root} onClick={this.onClick} />
            </ol>
        )
    }
}
