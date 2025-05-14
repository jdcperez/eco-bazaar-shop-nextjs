// import { Box, Button, Flex, Table } from "@radix-ui/themes";

// const TableRoot = ({
//     header,
//     body,
// }: {
//     header: React.ReactNode,
//     body: React.ReactNode,
// }) => {
//     return (
//         <>
//             <Box className="space-y-5">
//                 <Box overflow="auto">
//                     <Table.Root className="w-full text-left" variant="surface" >
//                         {/* Header */}
//                         {header}

//                         {/* Content */}
//                         {body}
//                     </Table.Root >
//                 </Box>
//             </Box>
//         </>
//     );
// }

// const TableHeader = ({
//     headerColumn,
// }: {
//     headerColumn: string[],

// }) => {
//     return (
//         <>
//             <Table.Header>
//                 <Table.Row>
//                     {headerColumn?.map((header: string, index: number) => (
//                         <Table.ColumnHeaderCell
//                             key={index}
//                             className="!align-middle"
//                         >
//                             {header}
//                         </Table.ColumnHeaderCell>
//                     ))}
//                 </Table.Row>
//             </Table.Header>
//         </>
//     );
// }

// const TableBody = ({
//     header,
//     body,
// }: {
    
//     : React.ReactNode,
//     body: React.ReactNode,
// }) => {
//     return (
//         <>
//             <Table.Body>
//                 <Table.Row>
//                     {headerColumn?.map((header: string, index: number) => (
//                         <Table.Cell
//                             key={index}
//                             className="!align-middle"
//                         >
//                             {header}
//                         </Table.Cell>
//                     ))}
//                 </Table.Row>
//             </Table.Body>
//         </>
//     );
// }