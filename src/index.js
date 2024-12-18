import { registerBlockType } from "@wordpress/blocks";
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
	__experimentalUnitControl as UnitControl,
} from "@wordpress/block-editor";
import { PanelBody, TextControl, ToggleControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import "./editor.scss";
import "./style.scss";

registerBlockType("create-block/mega-menu", {
	edit: ({ attributes, setAttributes }) => {
		const { menuTitle, buttonBackgroundColor, buttonTextColor } = attributes;
		const blockProps = useBlockProps({
			className: attributes.hideOnMobile ? "hide-on-mobile" : "",
		});

		// Create button style object
		const buttonStyle = {
			...(buttonBackgroundColor && { backgroundColor: buttonBackgroundColor }),
			...(buttonTextColor && { color: buttonTextColor }),
		};

		// Define allowed blocks
		const ALLOWED_BLOCKS = [
			"core/columns",
			"core/column",
			"core/heading",
			"core/paragraph",
			"core/navigation",
			"core/navigation-link",
			"core/navigation-submenu",
			"core/group",
			"core/list",
			"core/image",
		];

		// Define the template with navigation links
		const TEMPLATE = [
			[
				"core/group",
				{
					layout: {
						inherit: !attributes.contentWidth,
						type: "constrained",
						contentSize: attributes.contentWidth || undefined,
					},
					className: "mega-menu-container",
				},
				[
					[
						"core/columns",
						{ className: "mega-menu-columns" },
						[
							[
								"core/column",
								{},
								[
									["core/heading", { level: 3, content: "Column 1" }],
									[
										"core/navigation",
										{ orientation: "vertical" },
										[
											["core/navigation-link", { label: "Link 1", url: "/" }],
											["core/navigation-link", { label: "Link 2", url: "/" }],
											["core/navigation-link", { label: "Link 3", url: "/" }],
										],
									],
								],
							],
							[
								"core/column",
								{},
								[
									["core/heading", { level: 3, content: "Column 2" }],
									[
										"core/navigation",
										{ orientation: "vertical" },
										[
											["core/navigation-link", { label: "Link 4", url: "/" }],
											["core/navigation-link", { label: "Link 5", url: "/" }],
											["core/navigation-link", { label: "Link 6", url: "/" }],
										],
									],
								],
							],
							[
								"core/column",
								{},
								[
									["core/heading", { level: 3, content: "Column 3" }],
									[
										"core/navigation",
										{ orientation: "vertical" },
										[
											["core/navigation-link", { label: "Link 7", url: "/" }],
											["core/navigation-link", { label: "Link 8", url: "/" }],
											["core/navigation-link", { label: "Link 9", url: "/" }],
										],
									],
								],
							],
						],
					],
				],
			],
		];

		return (
			<div {...blockProps}>
				<InspectorControls>
					<PanelBody title={__("Menu Settings", "mega-menu")}>
						<TextControl
							label={__("Menu Title", "mega-menu")}
							value={menuTitle}
							onChange={(value) => setAttributes({ menuTitle: value })}
						/>
						<ToggleControl
							label={__("Hide on Mobile", "mega-menu")}
							checked={attributes.hideOnMobile}
							onChange={(value) => setAttributes({ hideOnMobile: value })}
							help={__("Menu will be hidden on mobile devices", "mega-menu")}
						/>
					</PanelBody>

					<PanelColorSettings
						title={__("Button Colors", "mega-menu")}
						colorSettings={[
							{
								value: buttonBackgroundColor,
								onChange: (color) =>
									setAttributes({ buttonBackgroundColor: color }),
								label: __("Background Color", "mega-menu"),
							},
							{
								value: buttonTextColor,
								onChange: (color) => setAttributes({ buttonTextColor: color }),
								label: __("Text Color", "mega-menu"),
							},
						]}
					/>

					<PanelBody title={__("Content Width", "mega-menu")}>
						<UnitControl
							label={__("Custom Width", "mega-menu")}
							value={attributes.contentWidth}
							onChange={(value) => setAttributes({ contentWidth: value })}
							units={[
								{ value: "px", label: "px" },
								{ value: "%", label: "%" },
								{ value: "rem", label: "rem" },
								{ value: "em", label: "em" },
							]}
							help={__("Leave empty to use theme default width", "mega-menu")}
						/>
					</PanelBody>
				</InspectorControls>

				<div className="mega-menu-item">
					<button
						className="mega-menu-trigger"
						onClick={() =>
							setAttributes({ isDropdownOpen: !attributes.isDropdownOpen })
						}
						style={Object.keys(buttonStyle).length ? buttonStyle : null}
					>
						{menuTitle}
						{attributes.isDropdownOpen ? (
							<svg
								className="dropdown-arrow open"
								width="10"
								height="6"
								viewBox="0 0 10 6"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M1 1L5 5L9 1"
									stroke={buttonTextColor}
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						) : (
							<svg
								className="dropdown-arrow"
								width="10"
								height="6"
								viewBox="0 0 10 6"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M1 5L5 1L9 5"
									stroke={buttonTextColor}
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						)}
					</button>

					<div
						className={`mega-menu-content ${
							attributes.isDropdownOpen ? "open" : ""
						}`}
					>
						<InnerBlocks
							allowedBlocks={ALLOWED_BLOCKS}
							template={TEMPLATE}
							templateLock={false}
						/>
					</div>
				</div>
			</div>
		);
	},

	save: ({ attributes }) => {
		const { menuTitle, buttonBackgroundColor, buttonTextColor } = attributes;
		const blockProps = useBlockProps.save({
			className: attributes.hideOnMobile ? "hide-on-mobile" : "",
		});

		// Create button style object
		const buttonStyle = {
			...(buttonBackgroundColor && { backgroundColor: buttonBackgroundColor }),
			...(buttonTextColor && { color: buttonTextColor }),
		};
		return (
			<div {...blockProps}>
				<div className="mega-menu-item">
					<button
						className="mega-menu-trigger"
						type="button"
						aria-expanded="false"
						style={Object.keys(buttonStyle).length ? buttonStyle : null}
					>
						{menuTitle}
						{attributes.isDropdownOpen ? (
							<svg
								className="dropdown-arrow open"
								width="10"
								height="6"
								viewBox="0 0 10 6"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M1 1L5 5L9 1"
									stroke={buttonTextColor}
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						) : (
							<svg
								className="dropdown-arrow"
								width="10"
								height="6"
								viewBox="0 0 10 6"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M1 5L5 1L9 5"
									stroke={buttonTextColor}
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						)}
					</button>

					<div className="mega-menu-content">
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		);
	},
});
