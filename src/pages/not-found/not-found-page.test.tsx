import { render, screen } from "@testing-library/react";

import { NotFoundPage } from "./not-found-page";

describe("NotFoundPage", () => {
  it("404와 안내 문구를 표시한다", () => {
    render(<NotFoundPage />);

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("페이지를 찾을 수 없습니다.")).toBeInTheDocument();
  });
});

