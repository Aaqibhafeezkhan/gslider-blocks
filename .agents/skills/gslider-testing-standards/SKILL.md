---
name: gslider-testing-standards
description: >-
  Standardized PHP unit test architecture, 1-to-1 class-to-test mapping conventions (matching Google Site Kit,
  WooCommerce, and 10up), test class naming, and test runner execution recipes for GSlider Blocks.
---

# GSlider PHP Testing Standards & Class Mapping Skill

This skill documents the **Modern Enterprise Open-Source Testing Architecture** for **GSlider Blocks**, adhering to the conventions established by industry leaders (**Google Site Kit, WooCommerce, 10up, and WP Engine**).

---

## 🏛️ Modern PSR-4 Test Naming Convention

In enterprise PHP and modern WordPress engineering, tests maintain **strict 1-to-1 parity** with production source files:

1. **Source Class & File (PascalCase PSR-4):**
   - Namespace: `GSlider\Classes\`
   - Class Name: `RegistrationPatterns`
   - Source Path: `includes/Classes/RegistrationPatterns.php`

2. **Matching Test Class & File (`*Test.php`):**
   - Test File Name: **`RegistrationPatternsTest.php`**
   - Test Class Name: **`RegistrationPatternsTest`**
   - Test Path: `tests/RegistrationPatternsTest.php` (or mirrored under `tests/Classes/RegistrationPatternsTest.php`)

3. **Test Method Naming Pattern (`test_<method_name>_<expected_behavior>`):**
   - Production Method: `public function register_patterns()`
   - Test Method: `public function test_register_patterns_registers_category_and_patterns()`

---

## 🗺️ Complete 1-to-1 Production Class to Test Class Matrix

Every core service and controller in GSlider Blocks maps directly to a matching `*Test.php` file:

| Production File (`includes/`) | Production Class Name | Test File Name (`tests/`) | Test Class Name | Scope of Tests |
| :--- | :--- | :--- | :--- | :--- |
| `includes/Classes/RegistrationPatterns.php` | `RegistrationPatterns` | **`RegistrationPatternsTest.php`** | `RegistrationPatternsTest` | Pattern registration, category, translations, Gutenberg markup |
| `includes/Classes/StyleGenerator.php` | `StyleGenerator` | **`StyleGeneratorTest.php`** | `StyleGeneratorTest` | Inline `<style>` generation, CSS sanitization, block ID scoping |
| `includes/Classes/RegistrationBlocks.php` | `RegistrationBlocks` | **`RegistrationBlocksTest.php`** | `RegistrationBlocksTest` | Block type registration, `block.json` schema validation |
| `includes/Classes/FontLoader.php` | `FontLoader` | **`FontLoaderTest.php`** | `FontLoaderTest` | Google Fonts enqueueing, GDPR privacy suppression |
| `includes/Classes/RegistrationCategory.php` | `RegistrationCategory` | **`RegistrationCategoryTest.php`** | `RegistrationCategoryTest` | Custom Gutenberg block category registration |
| `includes/Classes/SupportSVG.php` | `SupportSVG` | **`SupportSVGTest.php`** | `SupportSVGTest` | SVG upload mime types, XML sanitization security |
| `includes/Admin/Dashboard.php` | `Dashboard` | **`DashboardTest.php`** | `DashboardTest` | Admin menu registration, block visibility filter |
| `includes/Admin/DashboardController.php` | `DashboardController` | **`DashboardControllerTest.php`** | `DashboardControllerTest` | REST endpoints (`/dashboard`, settings, tools, toggles) |
| `includes/RestApi/BlocksController.php` | `BlocksController` | **`BlocksControllerTest.php`** | `BlocksControllerTest` | Headless REST endpoints (`/blocks/<id>`), permissions, schema |
| `includes/RestApi/BlockParser.php` | `BlockParser` | **`BlockParserTest.php`** | `BlockParserTest` | Slide parsing, Swiper config extraction, normalization |
| `includes/Utils/CssSanitizer.php` | `CssSanitizer` | **`CssSanitizerTest.php`** | `CssSanitizerTest` | CSS exploit defense (`@import`, `javascript:`, expressions) |
| `includes/Assets/FrontendAssets.php` | `FrontendAssets` | **`FrontendAssetsTest.php`** | `FrontendAssetsTest` | Swiper/vendor script & style enqueueing |
| `includes/Assets/AdminAssets.php` | `AdminAssets` | **`AdminAssetsTest.php`** | `AdminAssetsTest` | Admin dashboard CSS & JS script registration |

---

## ⚡ Test Harness Execution Architecture

Tests in GSlider Blocks are designed as a **zero-dependency, standalone CLI harness** that runs instantly across PHP 7.4 through 8.5 without requiring an external MySQL database:

```bash
# Run all tests in order
for f in tests/*Test.php; do php "$f"; done

# Run a specific test suite
php tests/RegistrationPatternsTest.php
php tests/StyleGeneratorTest.php
```

### GitHub Actions CI Configuration (`.github/workflows/ci.yml`):
```yaml
      - name: Run Test Suites
        run: |
          for test in tests/*Test.php; do
            echo "Running $test on PHP ${{ matrix.php-version }}..."
            php "$test"
          done
```

---

## 📐 Golden Rules for Writing Test Classes

1. **One Class Per Test File:** Every `*Test.php` file should focus exclusively on validating its matching production class.
2. **Deterministic & Isolated:** Tests must never depend on real database connections or external network APIs; all WordPress core functions must be provided via lightweight stubs in `tests/stubs/`.
3. **Strict Security Validation:** Any class dealing with user or block input (`StyleGenerator`, `CssSanitizer`, `SupportSVG`) must test known malicious payloads (XSS, script injection, arbitrary protocols).
4. **Descriptive Failure Messages:** Every assertion must output an explicit failure message with expected vs actual values.
