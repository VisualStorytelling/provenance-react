import * as React from 'react'
import { ProvenanceNode, NodeIdentifier } from '@visualstorytelling/provenance-core'

export interface IProps {
    node: ProvenanceNode
    onClick(nodeIdentifier: NodeIdentifier): void;
}

export class ProvenanceGraphNode extends React.Component<IProps, {}> {

    onClick = () => this.props.onClick(this.props.node.id)

    render() {
        const node = this.props.node;
        const children: JSX.Element[] = node.children.map(
            (child) => <ProvenanceGraphNode key={child.id} node={child} onClick={this.props.onClick}/>
        )
        return (
            <div>
                <button onClick={this.onClick}>{node.label}</button>
                <ol>
                    {children}
                </ol>
            </div>
        )
    }
}