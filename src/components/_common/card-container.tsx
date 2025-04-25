import { Card, Flex } from "@radix-ui/themes";

const CardFilterContainer = ({
  children,
}: {
  children: React.ReactNode,
}) => {
  return (
    <Card className="!p-8">
      <div className="card-header border-0">
        <Flex
          wrap="wrap"
          direction={{ initial: "column", sm: "row" }}
          gapX={{ sm: "3" }}
          gapY={{ sm: "2" }}
        >
          {children}
        </Flex>
      </div>
    </Card>
  );
};

export { CardFilterContainer };