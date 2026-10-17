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
   - Test Path: `tests/phpunit/Classes/RegistrationPatternsTest.php` (mirroring `includes/Classes/`)

3. **Test Method Naming Pattern (`test_<method_name>_<expected_behavior>`):**
   - Production Method: `public function register_patterns()`
   - Test Method: `public function test_register_patterns_registers_category_and_patterns()`

---

## 🗺️ Complete 1-to-1 Production Class to Test Class Matrix

Every core service and controller in GSlider Blocks maps directly to a matching `*Test.php` file in `tests/phpunit/`:

| Production File (`includes/`) | Production Class Name | Test File Path (`tests/phpunit/`) | Test Class Name | Scope of Tests |
| :--- | :--- | :--- | :--- | :--- |
| `includes/Classes/RegistrationPatterns.php` | `RegistrationPatterns` | **`tests/phpunit/Classes/RegistrationPatternsTest.php`** | `RegistrationPatternsTest` | Pattern registration, category, translations, Gutenberg markup |
| `includes/Classes/StyleGenerator.php` | `StyleGenerator` | **`tests/phpunit/Classes/StyleGeneratorTest.php`** | `StyleGeneratorTest` | Inline `<style>` generation, CSS sanitization, block ID scoping |
| `includes/Classes/RegistrationBlocks.php` | `RegistrationBlocks` | **`tests/phpunit/Classes/RegistrationBlocksTest.php`** | `RegistrationBlocksTest` | Block type registration, `block.json` schema validation |
| `includes/Classes/FontLoader.php` | `FontLoader` | **`tests/phpunit/Classes/FontLoaderTest.php`** | `FontLoaderTest` | Google Fonts enqueueing, GDPR privacy suppression |
| `includes/Classes/RegistrationCategory.php` | `RegistrationCategory` | **`tests/phpunit/Classes/RegistrationCategoryTest.php`** | `RegistrationCategoryTest` | Custom Gutenberg block category registration |
| `includes/Classes/SupportSVG.php` | `SupportSVG` | **`tests/phpunit/Classes/SupportSVGTest.php`** | `SupportSVGTest` | SVG upload mime types, XML sanitization security |
| `includes/Admin/Dashboard.php` | `Dashboard` | **`tests/phpunit/Admin/DashboardTest.php`** | `DashboardTest` | Admin menu registration, block visibility filter |
| `includes/Admin/DashboardController.php` | `DashboardController` | **`tests/phpunit/Admin/DashboardControllerTest.php`** | `DashboardControllerTest` | REST endpoints (`/dashboard`, settings, tools, toggles) |
| `includes/RestApi/BlocksController.php` | `BlocksController` | **`tests/phpunit/RestApi/BlocksControllerTest.php`** | `BlocksControllerTest` | Headless REST endpoints (`/blocks/<id>`), permissions, schema |
| `includes/RestApi/BlockParser.php` | `BlockParser` | **`tests/phpunit/RestApi/BlockParserTest.php`** | `BlockParserTest` | Slide parsing, Swiper config extraction, normalization |
| `includes/Utils/CssSanitizer.php` | `CssSanitizer` | **`tests/phpunit/Utils/CssSanitizerTest.php`** | `CssSanitizerTest` | CSS exploit defense (`@import`, `javascript:`, expressions) |
| `includes/Assets/FrontendAssets.php` | `FrontendAssets` | **`tests/phpunit/Assets/FrontendAssetsTest.php`** | `FrontendAssetsTest` | Swiper/vendor script & style enqueueing |
| `includes/Assets/AdminAssets.php` | `AdminAssets` | **`tests/phpunit/Assets/AdminAssetsTest.php`** | `AdminAssetsTest` | Admin dashboard CSS & JS script registration |

---

## ⚡ Test Harness Execution Architecture

Tests in GSlider Blocks are designed as a **zero-dependency, standalone CLI harness** that runs instantly across PHP 7.4 through 8.5 without requiring an external MySQL database:

```bash
# Run all tests recursively in order (standalone runner)
for test in $(find tests -name '*.php' ! -name 'bootstrap.php' ! -path '*/stubs/*' | sort); do
  echo "=== Running $test ==="
  php "$test"
done

# Run a specific test suite
php tests/phpunit/Admin/DashboardTest.php
php tests/phpunit/Classes/RegistrationPatternsTest.php
php tests/phpunit/RestApi/BlockParserTest.php
```

### GitHub Actions CI Configuration (`.github/workflows/ci.yml`):
```yaml
      - name: Run Test Suites
        run: |
          for test in $(find tests -name '*.php' ! -name 'bootstrap.php' ! -path '*/stubs/*' | sort); do
            echo "Running $test on PHP ${{ matrix.php-version }}..."
            php "$test"
          done
```

---

## 🏛️ WordPress Core 7.2 Modern Engineering & Testing Standards

When writing PHP code and unit tests, GSlider Blocks strictly adheres to the official standards established by WordPress Core 7.2 Trac initiatives:

### 1. Strict Type Assertions Over Loose Comparisons ([Trac #64895](https://core.trac.wordpress.org/ticket/64895))
- **Rule:** Never use loose comparisons (`==`, `!=`, or `assertEquals()`). Always use strict identical comparisons (`===`, `!==`, or `assertSame()`).
- **Rationale:** Loose comparisons hide subtle bugs, type coercion vulnerabilities, and false-positive truthy/falsy matches (e.g. `0 == false` or `"0" == false`).
- **Code Pattern:**
  ```php
  // ✅ Correct: Strict identical assertion
  $this->assert_true( 'gslider-blocks/base' === $one['blockName'], 'blockName matches' );
  $this->assert_true( 1 === $one['totalSlides'], 'totalSlides count matches' );

  // ❌ Prohibited: Loose comparison
  if ( $one['totalSlides'] == 1 ) ...
  ```

### 2. Static Analysis & PHPStan Level 5+ Cleanliness ([Trac #65817](https://core.trac.wordpress.org/ticket/65817))
- **Rule:** Explicitly declare method return types (`: void`, `: array`, `: bool`) and typed parameters. Eliminate dead variables, uninitialized properties, and unsafe mixed return types.
- **Rationale:** Preempts runtime type errors across PHP 7.4 through 8.5 without requiring runtime assertions.
- **Code Pattern:**
  ```php
  // ✅ Correct: Explicit return type and typed parameters
  public function run_all_tests(): void { ... }
  public function assert_true( $condition, string $message ): void { ... }
  private function normalize( array $attrs, string $name ): array { ... }
  ```

### 3. Comprehensive DocBlocks with Type Fidelity ([Trac #65860](https://core.trac.wordpress.org/ticket/65860))
- **Rule:** Every test class, test method, and helper must contain a complete, well-formed PHPDoc DocBlock including `@package`, description, `@param`, and `@return`.
- **Code Pattern:**
  ```php
  /**
   * Test class for GSlider\Admin\Dashboard.
   *
   * @package GSlider\Tests\Admin
   */
  class DashboardTest {
      /**
       * Test 1 & 2: Class exists, implements Registrable, and is a true singleton.
       *
       * @return void
       */
      public function test_class_implements_registrable_and_singleton(): void { ... }
  ```

### 4. PHP 8.1–8.5 Compatibility & Reflection Guards ([Trac #65819](https://core.trac.wordpress.org/ticket/65819))
- **Rule:** Never call `$reflectionProperty->setAccessible( true )` or `$reflectionMethod->setAccessible( true )` unconditionally on PHP 8.1+. Always guard with `PHP_VERSION_ID < 80100`.
- **Rationale:** PHP 8.1+ makes all reflection properties and methods accessible by default, and PHP 8.5 officially issues a deprecation notice when calling `setAccessible( true )`.
- **Code Pattern:**
  ```php
  $plugin_reflection = new ReflectionClass( Plugin::class );
  $services_property = $plugin_reflection->getProperty( 'services' );

  // ✅ Correct: Guarded against PHP 8.5 deprecation notice
  if ( PHP_VERSION_ID < 80100 ) {
      $services_property->setAccessible( true );
  }
  ```

### 5. WordPress Coding Standards (WPCS) Formatting ([Trac #65818](https://core.trac.wordpress.org/ticket/65818))
- **Rule:** Strict WPCS adherence:
  - Spaces inside parentheses: `if ( ! empty( $output ) )`
  - Spaces inside array brackets: `[ 'Desktop' => 4 ]`
  - Yoda conditions for all equality checks: `'gslider-blocks' === $slug` and `61 === Dashboard::MENU_POSITION`.

---

## 📐 Golden Rules for Writing Test Classes

1. **One Class Per Test File:** Every `*Test.php` file in `tests/phpunit/` must focus exclusively on validating its matching production class in `includes/`.
2. **Deterministic & Isolated:** Tests must never depend on real database connections or external network APIs; all WordPress core functions must be provided via lightweight stubs in `tests/phpunit/bootstrap.php` or `tests/stubs/`.
3. **Strict Security Validation:** Any class dealing with user or block input (`StyleGenerator`, `CssSanitizer`, `SupportSVG`) must test known malicious payloads (XSS, script injection, arbitrary protocols).
4. **Descriptive Failure Messages:** Every assertion must output an explicit failure message with expected vs actual values.
