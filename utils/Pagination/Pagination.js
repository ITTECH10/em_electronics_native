import React from 'react'
import { Layout, Text, Button, useTheme } from '@ui-kitten/components'

function Pagination({ data, RenderComponent, pageLimit, dataLimit, selectedCategoryIndex, selectedBodyPart }) {
    const [pages] = React.useState(Math.ceil(data.length / dataLimit));
    const [currentPage, setCurrentPage] = React.useState(1);
    const theme = useTheme()

    function goToNextPage() {
        setCurrentPage((page) => page + 1);
    }

    function goToPreviousPage() {
        setCurrentPage((page) => page - 1);
    }

    const changePage = (event) => {
        // console.log(event)
        const pageNumber = Number(event._dispatchInstances.memoizedProps.children);
        setCurrentPage(pageNumber);
    }

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit;
        const endIndex = startIndex + dataLimit;
        return data.slice(startIndex, endIndex);
    };

    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
    };

    return (
        <Layout>
            <Layout className="dataContainer">
                {getPaginatedData().map((d, idx) => (
                    <RenderComponent
                        key={idx} data={d}
                        selectedCategoryIndex={selectedCategoryIndex}
                        selectedBodyPart={selectedBodyPart}
                    />
                )
                )}
            </Layout>

            <Layout className="pagination" style={{ flexDirection: 'row', marginVertical: 3, justifyContent: 'center' }}>
                <Button
                    disabled={currentPage === 1}
                    onPress={goToPreviousPage}
                    className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
                >
                    prev
                </Button>

                {getPaginationGroup().map((item, index) => (
                    <Button
                        key={index}
                        // onPress={changePage}
                        className={`paginationItem ${currentPage === item ? 'active' : null}`}
                        style={{ marginHorizontal: 4, backgroundColor: currentPage === item ? theme['color-primary-700'] : theme['color-primary-400'] }}
                    >
                        <Text
                            onPress={changePage}
                        >
                            {item}
                        </Text>
                    </Button>
                ))}

                <Button
                    onPress={goToNextPage}
                    className={`next ${currentPage === pages ? 'disabled' : ''}`}
                    disabled={getPaginationGroup().length >= pages}
                >
                    next
                </Button>
            </Layout>
        </Layout>
    );
}

export default Pagination