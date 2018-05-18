import * as React from 'react'
import { ProvenanceNode, NodeIdentifier } from '@visualstorytelling/provenance-core'
import { lineBreak } from 'acorn';

export interface IProvenanceGraphNodeProps {
    node: ProvenanceNode
    current: ProvenanceNode
    onClick(nodeIdentifier: NodeIdentifier): void;
}

export class ProvenanceGraphNode extends React.Component<IProvenanceGraphNodeProps, {}> {

    onClick = () => this.props.onClick(this.props.node.id)

    render() {
        const node = this.props.node;
        const current = this.props.current;
        const children: JSX.Element[] = node.children.map(
            (child) => <ProvenanceGraphNode key={child.id} node={child} onClick={this.props.onClick} current={current}/>
        )
        let label = <span>{node.label}</span>
        if (node.id === current.id) {
            label = <b>{label}</b>
        }
        return (
            <li>
                <button onClick={this.onClick}>{label}</button>
                <ol>
                    {children}
                </ol>
            </li>
        )
    }
}